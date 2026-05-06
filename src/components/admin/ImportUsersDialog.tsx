import React, { useState, useCallback } from 'react';
import debug from '../../utils/debug';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getCurrentClientId } from '@/integrations/supabase/client';
import Papa from 'papaparse';
import { ImportError } from '../import/ImportErrorReport';
import { useQuery } from '@tanstack/react-query';
import { useOrganisationContext } from '@/context/OrganisationContext';

interface ImportUsersDialogProps {
  onImportComplete?: () => Promise<void>;
  onImportError?: (errors: ImportError[], warnings: ImportError[], stats: { success: number; total: number }) => void;
}


const ImportUsersDialog: React.FC<ImportUsersDialogProps> = ({ onImportComplete, onImportError }) => {
  // Get supabaseClient from context (provided by consuming app via OrganisationProvider)
  // DO NOT import supabase from '@/integrations/supabase/client' - it's a stub
  const { supabaseClient: supabase } = useOrganisationContext();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sendActivationEmails, setSendActivationEmails] = useState(false);
  const [importMode, setImportMode] = useState<'create' | 'update'>('create');

  // Fetch valid locations for validation
  const { data: validLocations } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('id, name')
        .eq('status', 'Active')
        .order('name');
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch valid departments for validation
  const { data: validDepartments } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('id, name')
        .order('name');
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch valid roles for validation
  const { data: validRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('roles')
        .select('role_id, name, department_id, is_active')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch all existing profiles for manager validation
  const { data: existingProfiles } = useQuery({
    queryKey: ['profiles-for-manager-validation'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .order('full_name');
      if (error) throw error;
      return data || [];
    },
  });


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file (.csv)",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} is ready for import`,
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

    const generateSampleCSV = () => {
    const csvContent = `"Email","Full Name","First Name","Last Name","Phone","Employee ID","Access Level","Location","Department","Role","Manager"
"john.doe@company.com","John Doe","John","Doe","+65-555-0123","EMP-2024-001","User","Main Office","Engineering","Software Engineer","jane.smith@company.com"
"jane.smith@company.com","Jane Smith","Jane","Smith","+65-555-0124","EMP-2024-002","Admin","Branch Office","Human Resources","HR Manager",""`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'user_import_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Helper function to validate access level
  const validateAccessLevel = (accessLevel: string): { isValid: boolean; value?: string } => {
    if (!accessLevel) {
      return { isValid: false };
    }

    const trimmedLevel = accessLevel.trim().toLowerCase();
    const validLevels = ['user', 'client_admin'];
    
    // Map display values to backend values
    const levelMapping: { [key: string]: string } = {
      'admin': 'client_admin',
      'client admin': 'client_admin'
    };

    const backendValue = levelMapping[trimmedLevel] || trimmedLevel;
    const isValid = validLevels.includes(backendValue);

    return {
      isValid,
      value: isValid ? backendValue : undefined
    };
  };

  // Helper function to translate technical errors to user-friendly messages
  const translateError = (error: any): string => {
    const errorMessage = error?.message || error?.error || 'Unknown error';
    
    debug.log('Translating error:', { originalError: error, errorMessage });
    
    // Handle specific Supabase/Edge Function errors
    if (errorMessage.includes('Edge Function returned a non-2xx status code')) {
      return 'Server error occurred while creating user. Please try again or contact support.';
    }
    
    // Check for "already registered" patterns first (most common case)
    if (errorMessage.includes('already registered') || errorMessage.includes('User already registered') || 
        errorMessage.includes('has already been registered')) {
      return 'A user with this email address already exists.';
    }
    
    if (errorMessage.includes('Failed to create user:')) {
      if (errorMessage.includes('User already registered') || errorMessage.includes('already registered')) {
        return 'A user with this email address already exists.';
      }
      if (errorMessage.includes('Invalid email')) {
        return 'The email address format is invalid.';
      }
      if (errorMessage.includes('Password should be at least')) {
        return 'Password does not meet security requirements.';
      }
      return 'Failed to create user account. Please check the email address and try again.';
    }
    
    // Handle Supabase Auth specific errors - check the original error object too
    const fullErrorMessage = JSON.stringify(error);
    if (fullErrorMessage.includes('already registered') || fullErrorMessage.includes('User already registered') || 
        fullErrorMessage.includes('has already been registered')) {
      return 'A user with this email address already exists.';
    }
    
    if (fullErrorMessage.includes('Invalid email') || fullErrorMessage.includes('invalid email') ||
        errorMessage.includes('Invalid email') || errorMessage.includes('invalid email')) {
      return 'The email address format is invalid.';
    }
    
    if (errorMessage.includes('Profile creation failed')) {
      return 'User account was created but profile setup failed. Please contact support.';
    }
    
    if (errorMessage.includes('Database error')) {
      return 'Database error occurred. Please try again or contact support.';
    }
    
    if (errorMessage.includes('Missing email')) {
      return 'Email address is required for all users.';
    }
    
    // Handle network/connection errors
    if (errorMessage.includes('fetch')) {
      return 'Network error occurred. Please check your connection and try again.';
    }
    
    // Handle timeout errors
    if (errorMessage.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }
    
    // Handle FunctionsHttpError specifically
    if (errorMessage === 'Unknown error' && fullErrorMessage.includes('FunctionsHttpError')) {
      // This is likely a user already exists error that's not being properly translated
      // Check if we can extract more info from the error object
      if (error?.context || error?.hint) {
        const context = error.context || '';
        const hint = error.hint || '';
        if (context.includes('already') || hint.includes('already')) {
          return 'A user with this email address already exists.';
        }
      }
      return 'Server error occurred while creating user. Please try again or contact support.';
    }
    
    // Default fallback - return a more user-friendly version of the original error
    return errorMessage.length > 100 
      ? 'An unexpected error occurred while creating the user. Please try again.'
      : errorMessage;
  };

  const processUserImport = async (
    row: any,
    locationCache: Map<string, string>,
    departmentCache: Map<string, string>,
    roleCache: Map<string, string>
  ) => {
    const email = row['Email'] || row['email'];
    
    if (!email) {
      console.error('Missing email for row:', row);
      throw new Error('Email address is required for all users.');
    }

    // Validate required name fields
    const fullName = row['Full Name'] || row['full_name'] || '';
    const firstName = row['First Name'] || row['first_name'] || '';
    const lastName = row['Last Name'] || row['last_name'] || '';
    
    if (!fullName || !fullName.trim()) {
      throw new Error('Full Name is required for all users.');
    }
    
    if (!firstName || !firstName.trim()) {
      throw new Error('First Name is required for all users.');
    }
    
    if (!lastName || !lastName.trim()) {
      throw new Error('Last Name is required for all users.');
    }

    debug.log('Processing user:', email);

    const accessLevelValue = row['Access Level'] || row['access_level'] || '';
    const accessLevelValidation = validateAccessLevel(accessLevelValue);
    
    if (!accessLevelValidation.isValid) {
      throw new Error(`Access Level "${accessLevelValue}" is invalid. Only "user" and "admin" are allowed.`);
    }

    const locationName = (row['Location'] || row['location'] || '').trim();
    const departmentName = (row['Department'] || row['department'] || '').trim();
    const roleName = (row['Role'] || row['role'] || '').trim();

    // Resolve IDs from pre-built caches (populated in Pass 0)
    const locationId = locationName ? locationCache.get(locationName.toLowerCase()) : undefined;
    const departmentId = departmentName ? departmentCache.get(departmentName.toLowerCase()) : undefined;
    const roleKey = `${roleName.toLowerCase()}::${departmentName.toLowerCase()}`;
    const roleId = roleName ? roleCache.get(roleKey) : undefined;

    // Manager is assigned in pass 2 (after all users created) so order in CSV doesn't matter
    const managerEmail = (row['Manager'] || row['manager'] || '').trim() || undefined;

    // Extract client path using the same logic as client.ts
    const clientId = getCurrentClientId();
    const clientPath = clientId ? `/${clientId}` : '';
    
    // Use our create-user edge function instead of direct signUp
    const { data: authData, error: authError } = await supabase.functions.invoke('create-user', {
      body: {
        email: email,
        full_name: fullName.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: row['Phone'] || row['phone'] || '',
        status: 'Pending',
        employee_id: row['Employee ID'] || row['employee_id'] || '',
        access_level: accessLevelValidation.value!,
        manager: null, // Manager assigned in pass 2 after all users exist
        clientPath
      }
    });

    if (authError) {
      console.error('Auth error for user:', email, authError);
      const friendlyError = translateError(authError);
      throw new Error(friendlyError);
    }

    if (authData && authData.user) {
      debug.log('User created successfully:', email);
    } else if (authData && authData.error) {
      console.error('Create user error:', authData.error);
      const friendlyError = translateError(authData.error);
      throw new Error(friendlyError);
    }

    const userId = authData?.user?.id;
    if (!userId) {
      throw new Error('User created but user ID not returned');
    }

    // Collect all warnings (manager assignment happens in pass 2)
    const warnings = [];

    // Assign location if provided
    if (locationName) {
      if (locationId) {
        try {
          const { error: locationError } = await supabase
            .from('physical_location_access')
            .insert({
              user_id: userId,
              location_id: locationId,
              full_name: fullName.trim(),
              access_purpose: 'General Access',
              status: 'Active',
              date_access_created: new Date().toISOString()
            });

          if (locationError) {
            console.error('Error assigning location to physical_location_access:', locationError);
            warnings.push({
              field: 'Location',
              value: locationName,
              message: `Location "${locationName}" could not be assigned: ${locationError.message}`
            });
          } else {
            const { error: profileError } = await supabase
              .from('profiles')
              .update({ location: locationName, location_id: locationId })
              .eq('id', userId);

            if (profileError) {
              console.error('Error updating profile location:', profileError);
              warnings.push({
                field: 'Location',
                value: locationName,
                message: `Location "${locationName}" was assigned but could not be saved to profile: ${profileError.message}`
              });
            }
          }
        } catch (locationError: any) {
          console.error('Exception assigning location:', locationError);
          warnings.push({
            field: 'Location',
            value: locationName,
            message: `Location "${locationName}" could not be assigned: ${locationError.message}`
          });
        }
      } else {
        warnings.push({
          field: 'Location',
          value: locationName,
          message: `Location "${locationName}" could not be created or found — skipping assignment`
        });
      }
    }

    // Assign department and/or role if provided (warn for any that couldn't be resolved)
    if (departmentName && !departmentId) {
      warnings.push({
        field: 'Department',
        value: departmentName,
        message: `Department "${departmentName}" could not be created or found — skipping assignment`
      });
    }
    if (roleName && !roleId) {
      warnings.push({
        field: 'Role',
        value: roleName,
        message: `Role "${roleName}" could not be created or found — skipping assignment`
      });
    }

    if (departmentId || roleId) {
      try {
        const pairingId = (departmentId && roleId) ? crypto.randomUUID() : undefined;

        // Assign department if provided
        if (departmentId) {
          const { error: deptError } = await supabase
            .from('user_departments')
            .insert({
              user_id: userId,
              department_id: departmentId,
              is_primary: false, // Will be set to true if this is the first department
              pairing_id: pairingId,
              assigned_by: userId // In production, this should be the current admin user ID
            });

          if (deptError) {
            console.error('Error assigning department:', deptError);
            warnings.push({
              field: 'Department',
              value: departmentName,
              message: `Department "${departmentName}" could not be assigned: ${deptError.message}`
            });
          } else {
            // Set as primary if this is the first department (check if any exist)
            const { data: existingDepts } = await supabase
              .from('user_departments')
              .select('id')
              .eq('user_id', userId);
            
            if (existingDepts && existingDepts.length === 1) {
              // This is the first department, set as primary
              await supabase
                .from('user_departments')
                .update({ is_primary: true })
                .eq('user_id', userId)
                .eq('department_id', departmentId);
            }
          }
        }

        // Assign role if provided
        if (roleId) {
          const { error: roleError } = await supabase
            .from('user_profile_roles')
            .insert({
              user_id: userId,
              role_id: roleId,
              is_primary: false, // Will be set to true if this is the first role
              pairing_id: pairingId,
              assigned_by: userId // In production, this should be the current admin user ID
            });

          if (roleError) {
            console.error('Error assigning role:', roleError);
            warnings.push({
              field: 'Role',
              value: roleName,
              message: `Role "${roleName}" could not be assigned: ${roleError.message}`
            });
          } else {
            // Set as primary if this is the first role (check if any exist)
            const { data: existingRoles } = await supabase
              .from('user_profile_roles')
              .select('id')
              .eq('user_id', userId);
            
            if (existingRoles && existingRoles.length === 1) {
              // This is the first role, set as primary
              await supabase
                .from('user_profile_roles')
                .update({ is_primary: true })
                .eq('user_id', userId)
                .eq('role_id', roleId);
            }
          }
        }
      } catch (assignmentError: any) {
        console.error('Exception assigning department/role:', assignmentError);
        warnings.push({
          field: 'Department/Role',
          value: `${departmentName || ''} / ${roleName || ''}`,
          message: `Could not assign department/role: ${assignmentError.message}`
        });
      }
    }

    return { 
      email, 
      success: true, 
      userId,
      managerEmail,
      warnings: warnings.length > 0 ? warnings : null
    };
  };

  // ── Update mode: look up existing users by email and patch their data ──────
  const processUserUpdate = async (
    row: any,
    locationCache: Map<string, string>,
    departmentCache: Map<string, string>,
    roleCache: Map<string, string>
  ) => {
    const email = (row['Email'] || row['email'] || '').trim();
    if (!email) throw new Error('Email address is required for all users.');

    // Resolve existing user by email
    const { data: profileData, error: profileLookupError } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('email', email)
      .maybeSingle();

    if (profileLookupError) throw new Error(`Failed to look up user: ${profileLookupError.message}`);
    if (!profileData) {
      // User doesn't exist yet — create them just like create mode
      return processUserImport(row, locationCache, departmentCache, roleCache);
    };

    const userId = profileData.id;
    const warnings: any[] = [];
    const additions: { field: string; value: string }[] = [];

    const fullName = (row['Full Name'] || row['full_name'] || '').trim();
    const firstName = (row['First Name'] || row['first_name'] || '').trim();
    const lastName = (row['Last Name'] || row['last_name'] || '').trim();
    const phone = (row['Phone'] || row['phone'] || '').trim();
    const employeeId = (row['Employee ID'] || row['employee_id'] || '').trim();
    const locationName = (row['Location'] || row['location'] || '').trim();
    const departmentName = (row['Department'] || row['department'] || '').trim();
    const roleName = (row['Role'] || row['role'] || '').trim();
    const managerEmail = (row['Manager'] || row['manager'] || '').trim() || undefined;

    const locationId = locationName ? locationCache.get(locationName.toLowerCase()) : undefined;
    const departmentId = departmentName ? departmentCache.get(departmentName.toLowerCase()) : undefined;
    const roleKey = `${roleName.toLowerCase()}::${departmentName.toLowerCase()}`;
    const roleId = roleName ? roleCache.get(roleKey) : undefined;

    // Build profile patch (only fields that were provided)
    const profileUpdates: Record<string, any> = {};
    if (fullName) profileUpdates.full_name = fullName;
    if (firstName) profileUpdates.first_name = firstName;
    if (lastName) profileUpdates.last_name = lastName;
    if (phone) profileUpdates.phone = phone;
    if (employeeId) profileUpdates.employee_id = employeeId;
    if (locationId) { profileUpdates.location = locationName; profileUpdates.location_id = locationId; }

    if (Object.keys(profileUpdates).length > 0) {
      const { error: updateError } = await supabase.from('profiles').update(profileUpdates).eq('id', userId);
      if (updateError) {
        warnings.push({ field: 'Profile', value: email, message: `Profile could not be updated: ${updateError.message}` });
      } else {
        const updatedFields = Object.keys(profileUpdates).filter(k => !['location', 'location_id'].includes(k));
        if (updatedFields.length > 0) {
          additions.push({ field: 'Profile', value: `Updated: ${updatedFields.join(', ')}` });
        }
      }
    }

    // Physical location access — add if not already present
    if (locationId) {
      const { data: existingAccess } = await supabase
        .from('physical_location_access').select('id').eq('user_id', userId).eq('location_id', locationId).maybeSingle();
      if (!existingAccess) {
        const { error: locationError } = await supabase.from('physical_location_access').insert({
          user_id: userId,
          location_id: locationId,
          full_name: fullName || profileData.full_name,
          access_purpose: 'General Access',
          status: 'Active',
          date_access_created: new Date().toISOString()
        });
        if (locationError) {
          warnings.push({ field: 'Location', value: locationName, message: `Location access could not be assigned: ${locationError.message}` });
        } else {
          additions.push({ field: 'Location', value: locationName });
        }
      }
    } else if (locationName) {
      warnings.push({ field: 'Location', value: locationName, message: `Location "${locationName}" not found — skipping assignment` });
    }

    // Helper: assign role (if not already present), closes over warnings + additions
    const assignRole = async (rId: string, pairingId?: string) => {
      const { data: existingRole } = await supabase
        .from('user_profile_roles').select('id').eq('user_id', userId).eq('role_id', rId).maybeSingle();
      if (existingRole) {
        warnings.push({ field: 'Role', value: roleName, message: `Role "${roleName}" is already assigned — skipped` });
        return;
      }
      const { data: allRoles } = await supabase.from('user_profile_roles').select('id').eq('user_id', userId);
      const { error: roleError } = await supabase.from('user_profile_roles').insert({
        user_id: userId, role_id: rId,
        is_primary: !allRoles || allRoles.length === 0,
        pairing_id: pairingId,
        assigned_by: userId
      });
      if (roleError) {
        warnings.push({ field: 'Role', value: roleName, message: `Role could not be assigned: ${roleError.message}` });
      } else {
        additions.push({ field: 'Role', value: roleName });
      }
    };

    // Department assignment — add if not already present
    if (departmentId) {
      const { data: existingDept } = await supabase
        .from('user_departments').select('id').eq('user_id', userId).eq('department_id', departmentId).maybeSingle();
      if (existingDept) {
        warnings.push({ field: 'Department', value: departmentName, message: `Department "${departmentName}" is already assigned — skipped` });
        if (roleId) await assignRole(roleId);
      } else {
        const pairingId = roleId ? crypto.randomUUID() : undefined;
        const { data: allDepts } = await supabase.from('user_departments').select('id').eq('user_id', userId);
        const { error: deptError } = await supabase.from('user_departments').insert({
          user_id: userId, department_id: departmentId,
          is_primary: !allDepts || allDepts.length === 0,
          pairing_id: pairingId, assigned_by: userId
        });
        if (deptError) {
          warnings.push({ field: 'Department', value: departmentName, message: `Department could not be assigned: ${deptError.message}` });
        } else {
          additions.push({ field: 'Department', value: departmentName });
        }
        if (roleId) await assignRole(roleId, pairingId);
      }
    } else if (departmentName) {
      warnings.push({ field: 'Department', value: departmentName, message: `Department "${departmentName}" not found — skipping assignment` });
      if (roleId) await assignRole(roleId);
    } else if (roleId) {
      await assignRole(roleId);
    } else if (roleName) {
      warnings.push({ field: 'Role', value: roleName, message: `Role "${roleName}" not found — skipping assignment` });
    }

    return {
      email,
      success: true,
      userId,
      managerEmail,
      warnings: warnings.length > 0 ? warnings : null,
      additions,
    };
  };

  const handleImport = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a file first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const text = await uploadedFile.text();
      
      Papa.parse(text, {
        header: true,
        complete: async (results) => {
          const data = results.data as any[];
          
          if (data.length === 0) {
            toast({
              title: "Empty file",
              description: "The uploaded file contains no data",
              variant: "destructive",
            });
            setIsProcessing(false);
            return;
          }

          debug.log('Processing', data.length, 'rows');
          let successCount = 0;
          const errors: ImportError[] = [];
          const warnings: ImportError[] = [];
          const createdUsers: Array<{ rowNumber: number; email: string; userId: string; managerEmail?: string; row: any }> = [];

          // ── Pass 0: Build location / department / role caches ───────────────
          // Seed caches from what already exists in the DB
          const locationCache = new Map<string, string>(); // lower_name → id
          const departmentCache = new Map<string, string>(); // lower_name → id
          const roleCache = new Map<string, string>(); // `${role_lower}::${dept_lower}` → role_id

          (validLocations || []).forEach((loc: { id: string; name: string }) =>
            locationCache.set(loc.name.toLowerCase(), loc.id)
          );
          (validDepartments || []).forEach((dept: { id: string; name: string }) =>
            departmentCache.set(dept.name.toLowerCase(), dept.id)
          );
          // For existing roles build key as `name::dept_name_lower` using reverse dept id→name map
          const deptIdToName = new Map<string, string>();
          (validDepartments || []).forEach((dept: { id: string; name: string }) =>
            deptIdToName.set(dept.id, dept.name.toLowerCase())
          );
          (validRoles || []).forEach((role: { role_id: string; name: string; department_id: string | null }) => {
            const deptKey = role.department_id ? (deptIdToName.get(role.department_id) ?? '') : '';
            roleCache.set(`${role.name.toLowerCase()}::${deptKey}`, role.role_id);
          });

          // Collect unique locations / departments / (role, department) pairs from CSV
          const uniqueLocations = new Set<string>();
          const uniqueDepartments = new Set<string>();
          const uniqueRolePairs = new Set<string>(); // `${roleName}|||${deptName}`

          for (const row of data) {
            const loc = (row['Location'] || row['location'] || '').trim();
            const dept = (row['Department'] || row['department'] || '').trim();
            const role = (row['Role'] || row['role'] || '').trim();
            if (loc) uniqueLocations.add(loc);
            if (dept) uniqueDepartments.add(dept);
            if (role) uniqueRolePairs.add(`${role}|||${dept}`);
          }

          // Pass 0a: Ensure locations exist
          for (const locName of uniqueLocations) {
            const key = locName.toLowerCase();
            if (!locationCache.has(key)) {
              try {
                const { data: newLoc, error } = await supabase
                  .from('locations')
                  .insert({ name: locName, status: 'Active' })
                  .select('id')
                  .single();
                if (!error && newLoc) {
                  locationCache.set(key, newLoc.id);
                  debug.log('[ImportUsersDialog] Auto-created location:', locName);
                } else if (error) {
                  debug.error('[ImportUsersDialog] Failed to create location:', locName, error);
                }
              } catch (err) {
                debug.error('[ImportUsersDialog] Exception creating location:', locName, err);
              }
            }
          }

          // Pass 0b: Ensure departments exist
          for (const deptName of uniqueDepartments) {
            const key = deptName.toLowerCase();
            if (!departmentCache.has(key)) {
              try {
                const { data: newDept, error } = await supabase
                  .from('departments')
                  .insert({ name: deptName })
                  .select('id')
                  .single();
                if (!error && newDept) {
                  departmentCache.set(key, newDept.id);
                  debug.log('[ImportUsersDialog] Auto-created department:', deptName);
                } else if (error) {
                  debug.error('[ImportUsersDialog] Failed to create department:', deptName, error);
                }
              } catch (err) {
                debug.error('[ImportUsersDialog] Exception creating department:', deptName, err);
              }
            }
          }

          // Pass 0c: Ensure roles exist (needs departmentCache populated first)
          for (const pair of uniqueRolePairs) {
            const sep = pair.indexOf('|||');
            const roleName = pair.slice(0, sep);
            const deptName = pair.slice(sep + 3);
            const roleKey = `${roleName.toLowerCase()}::${deptName.toLowerCase()}`;
            if (!roleCache.has(roleKey)) {
              const deptId = deptName ? (departmentCache.get(deptName.toLowerCase()) ?? null) : null;
              try {
                const { data: newRole, error } = await supabase
                  .from('roles')
                  .insert({ name: roleName, department_id: deptId, is_active: true })
                  .select('role_id')
                  .single();
                if (!error && newRole) {
                  roleCache.set(roleKey, newRole.role_id);
                  debug.log('[ImportUsersDialog] Auto-created role:', roleName, deptName ? `(${deptName})` : '(general)');
                } else if (error) {
                  debug.error('[ImportUsersDialog] Failed to create role:', roleName, error);
                }
              } catch (err) {
                debug.error('[ImportUsersDialog] Exception creating role:', roleName, err);
              }
            }
          }

          debug.log('[ImportUsersDialog] Pass 0 complete. Cache sizes:', {
            locations: locationCache.size, departments: departmentCache.size, roles: roleCache.size,
          });
          // ── End Pass 0 ─────────────────────────────────────────────────────

          // Pass 1: Create or update users (manager column is deferred to pass 2)
          for (let i = 0; i < data.length; i++) {
            const row = data[i];
            
            if (!row['Email'] && !row['email'] && !row['Full Name'] && !row['full_name']) {
              debug.log('Skipping empty row at index', i);
              continue;
            }

            const email = row['Email'] || row['email'] || 'Unknown';
            const rowNumber = i + 2;
            
            try {
              debug.log(`Processing user ${i + 1} of ${data.length}:`, email);
              const result = importMode === 'update'
                ? await processUserUpdate(row, locationCache, departmentCache, roleCache)
                : await processUserImport(row, locationCache, departmentCache, roleCache);
              successCount++;
              debug.log(`Successfully processed user ${i + 1}`);
              
              createdUsers.push({
                rowNumber,
                email,
                userId: result.userId,
                managerEmail: result.managerEmail,
                row
              });
              
              if (result.warnings) {
                result.warnings.forEach((warning: any) => {
                  warnings.push({
                    rowNumber,
                    identifier: email,
                    field: warning.field,
                    error: warning.message,
                    rawData: row
                  });
                });
              }

              // Collect successful additions (update mode only) as info items
              if ('additions' in result && result.additions && result.additions.length > 0) {
                debug.log(`[ImportUsersDialog] additions for ${email}:`, result.additions);
                result.additions.forEach((addition: { field: string; value: string }) => {
                  const infoItem = {
                    rowNumber,
                    identifier: email,
                    field: addition.field,
                    error: addition.value,
                    type: 'info' as const,
                  };
                  debug.log(`[ImportUsersDialog] pushing info item:`, infoItem);
                  warnings.push(infoItem);
                });
              } else {
                debug.log(`[ImportUsersDialog] no additions for ${email}. 'additions' in result:`, 'additions' in result, 'result.additions:', (result as any).additions);
              }
            } catch (error: any) {
              console.error(`Error importing user ${i + 1}:`, error);
              const friendlyError = translateError(error);
              errors.push({
                rowNumber,
                identifier: email,
                field: !row['Email'] && !row['email'] ? 'Email' : undefined,
                error: friendlyError,
                rawData: row
              });
            }

            if (i < data.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          }

          // Pass 2: Assign managers (all users from CSV now exist, so order doesn't matter)
          const emailToId = new Map<string, string>();
          (existingProfiles || []).forEach((p: { id: string; email?: string }) => {
            const e = (p.email ?? '').trim().toLowerCase();
            if (e) emailToId.set(e, p.id);
          });
          createdUsers.forEach((u) => {
            const e = u.email.trim().toLowerCase();
            if (e) emailToId.set(e, u.userId);
          });

          for (const u of createdUsers) {
            if (!u.managerEmail) continue;
            const managerId = emailToId.get(u.managerEmail.trim().toLowerCase());
            if (managerId) {
              try {
                const { error: managerUpdateError } = await supabase
                  .from('profiles')
                  .update({ manager: managerId })
                  .eq('id', u.userId);
                if (managerUpdateError) {
                  warnings.push({
                    rowNumber: u.rowNumber,
                    identifier: u.email,
                    field: 'Manager',
                    error: `Manager could not be assigned: ${managerUpdateError.message}`,
                    rawData: u.row
                  });
                } else {
                  debug.log(`Assigned manager ${u.managerEmail} for user ${u.email}`);
                }
              } catch (err: any) {
                warnings.push({
                  rowNumber: u.rowNumber,
                  identifier: u.email,
                  field: 'Manager',
                  error: `Manager could not be assigned: ${err?.message ?? err}`,
                  rawData: u.row
                });
              }
            } else {
              warnings.push({
                rowNumber: u.rowNumber,
                identifier: u.email,
                field: 'Manager',
                error: `Manager email "${u.managerEmail}" does not exist in the system - user created without manager assignment`,
                rawData: u.row
              });
            }
          }

          debug.log('Import completed. Success:', successCount, 'Errors:', errors.length, 'Warnings:', warnings.length);

          // Pass 3: Send activation emails to newly created users if requested
          if (sendActivationEmails && createdUsers.length > 0) {
            const pathParts = window.location.pathname.split('/').filter(Boolean);
            const reserved = ['admin', 'activate-account', 'reset-password', 'forgot-password', 'email-notifications'];
            const clientSegment = pathParts[0] && !reserved.includes(pathParts[0]) ? pathParts[0] : '';
            const redirectUrl = clientSegment
              ? `${window.location.origin}/${clientSegment}/activate-account`
              : `${window.location.origin}/activate-account`;

            debug.log('[ImportUsersDialog] Sending activation emails to', createdUsers.length, 'users, redirectUrl:', redirectUrl);

            const BATCH_SIZE = 5;
            const BATCH_DELAY_MS = 1000;
            let emailsSent = 0;
            let emailsFailed = 0;

            for (let i = 0; i < createdUsers.length; i += BATCH_SIZE) {
              const batch = createdUsers.slice(i, i + BATCH_SIZE);
              await Promise.all(batch.map(async (u) => {
                try {
                  const { error: emailError } = await supabase.functions.invoke('request-activation-link', {
                    body: { email: u.email, redirectUrl },
                  });
                  if (emailError) throw emailError;
                  debug.log('[ImportUsersDialog] Activation email sent to', u.email);
                  emailsSent++;
                } catch (err) {
                  debug.error('[ImportUsersDialog] Failed to send activation email to', u.email, err);
                  emailsFailed++;
                }
              }));
              if (i + BATCH_SIZE < createdUsers.length) {
                await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
              }
            }

            debug.log('[ImportUsersDialog] Activation emails done. Sent:', emailsSent, 'Failed:', emailsFailed);
          }

          setUploadedFile(null);
          setSendActivationEmails(false);
          setIsProcessing(false);
          setIsOpen(false);

          // Split info items (successful additions) from real warnings for toast logic
          debug.log(`[ImportUsersDialog] warnings array (${warnings.length} items):`, warnings.map(w => ({ type: w.type, field: w.field, identifier: w.identifier })));
          const realWarnings = warnings.filter((w: any) => w.type !== 'info');
          const infoItems = warnings.filter((w: any) => w.type === 'info');
          debug.log(`[ImportUsersDialog] split — realWarnings:${realWarnings.length} infoItems:${infoItems.length}`);
          const shouldShowReport = errors.length > 0 || realWarnings.length > 0 || (importMode === 'update' && infoItems.length > 0);

          // Show combined error / warning / additions report through parent component
          if (shouldShowReport && onImportError) {
            setTimeout(() => {
              onImportError(errors, warnings, { success: successCount, total: data.length });
            }, 300);

            if (errors.length > 0 && realWarnings.length > 0) {
              toast({
                title: "Import completed with errors and warnings",
                description: `${successCount} users processed. ${errors.length} failed, ${realWarnings.length} have validation warnings.`,
                variant: "destructive",
              });
            } else if (errors.length > 0) {
              toast({
                title: "Import completed with errors",
                description: `${successCount} users processed. ${errors.length} failed. Opening error report...`,
                variant: "destructive",
              });
            } else if (realWarnings.length > 0) {
              toast({
                title: "Import completed with warnings",
                description: `${successCount} users processed. ${realWarnings.length} have validation warnings. Opening report...`,
                variant: "default",
              });
            } else if (importMode === 'update' && infoItems.length > 0) {
              toast({
                title: "Update completed",
                description: `${successCount} users updated. Opening additions report...`,
              });
            }
          } else {
            toast({
              title: "Import completed successfully",
              description: importMode === 'update'
                ? `All ${successCount} users updated successfully.`
                : `All ${successCount} users imported successfully. Users will need to activate their accounts via email.`,
            });
          }
          
          // Refresh the user list after successful import
          if (onImportComplete) {
            await onImportComplete();
          }
        },
        error: (error: any) => {
          console.error('Parse error:', error);
          toast({
            title: "Parse error",
            description: "Failed to parse the CSV file",
            variant: "destructive",
          });
          setIsProcessing(false);
        }
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import failed",
        description: "An error occurred while importing the file",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open && !isProcessing) {
      setUploadedFile(null);
      setSendActivationEmails(false);
      setImportMode('create');
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{importMode === 'update' ? 'Update Existing Users' : 'Import Users'}</DialogTitle>
          <DialogDescription>
            {importMode === 'update'
              ? 'Upload a CSV to update existing users (matched by email) to add departments and roles to their profiles, and update their location and profile fields. Unrecognised emails are created as new users.'
              : 'Upload a CSV file to import users in bulk. Locations, departments, and roles will be created automatically if they don\'t already exist.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Mode toggle */}
          <div className="flex rounded-lg border overflow-hidden">
            <button
              type="button"
              onClick={() => { setImportMode('create'); setUploadedFile(null); }}
              disabled={isProcessing}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                importMode === 'create'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:bg-muted'
              }`}
            >
              Create new users
            </button>
            <button
              type="button"
              onClick={() => { setImportMode('update'); setUploadedFile(null); setSendActivationEmails(false); }}
              disabled={isProcessing}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                importMode === 'update'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:bg-muted'
              }`}
            >
              Update existing users
            </button>
          </div>

          <div className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-blue-400 bg-blue-50'
                  : uploadedFile
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              
              {uploadedFile ? (
                <div>
                  <p className="text-lg font-medium text-green-700">File Ready for Import</p>
                  <p className="text-sm text-green-600 mt-1">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Click to select a different file or drop a new one here
                  </p>
                </div>
              ) : isDragActive ? (
                <p className="text-lg font-medium text-blue-700">Drop your user file here</p>
              ) : (
                <div>
                  <p className="text-lg font-medium">Drag and drop your user file here, or browse</p>
                        <p className="text-sm text-gray-500 mt-1">Supports CSV files (.csv)</p>
                </div>
              )}
            </div>

            {uploadedFile && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="send-activation-emails"
                    checked={sendActivationEmails}
                    onCheckedChange={(checked: boolean | 'indeterminate') => setSendActivationEmails(checked === true)}
                    disabled={isProcessing}
                  />
                  <Label htmlFor="send-activation-emails" className="text-sm font-normal cursor-pointer">
                    Send activation emails to new users
                  </Label>
                </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleImport}
                  disabled={isProcessing}
                  className="flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setUploadedFile(null)}
                  disabled={isProcessing}
                >
                  X
                </Button>
              </div>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">User Import Template</h4>
            <p className="text-sm text-yellow-700 mb-3">Download a template for importing users with sample data.</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Users Template (CSV)</span>
                  <Badge variant="secondary" className="text-xs">Ready to use template</Badge>
                </div>
                <Button size="sm" variant="outline" onClick={generateSampleCSV} className="gap-2">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Available Columns</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {(importMode === 'update'
                ? ['Email', 'Full Name', 'First Name', 'Last Name', 'Phone', 'Employee ID', 'Location', 'Department', 'Role', 'Manager']
                : ['Email', 'Full Name', 'First Name', 'Last Name', 'Phone', 'Employee ID', 'Access Level', 'Location', 'Department', 'Role', 'Manager']
              ).map((column) => (
                <Badge key={column} variant="outline" className="text-xs">
                  {column}
                </Badge>
              ))}
            </div>
            {importMode === 'update' ? (
              <div className="text-sm text-blue-800 space-y-1">
                <p>• <strong>Email</strong> is required — used to look up the existing user; if not found, the user will be created</p>
                <p>• All other columns are optional for existing users — only populated fields are updated</p>
                <p>• <strong>Location</strong> - must already exist in the system; updates the user's primary location and adds a physical access entry if not already present</p>
                <p>• <strong>Department</strong> - must already exist; added to the user's departments if not already assigned</p>
                <p>• <strong>Role</strong> - must already exist; added to the user's roles if not already assigned. If Department is also provided, role and department are linked with a pairing ID</p>
                <p>• <strong>Manager</strong> - must be specified by email address; updates the user's manager field</p>
                <p>• Existing assignments are never removed — this is an additive update</p>
              </div>
            ) : (
              <div className="text-sm text-blue-800 space-y-1">
                <p>• <strong>Email</strong> is required for each user</p>
                <p>• <strong>Full Name</strong> is required for each user</p>
                <p>• <strong>First Name</strong> is required for each user</p>
                <p>• <strong>Last Name</strong> is required for each user</p>
                <p>• Users will be created with 'Pending' status and must activate via email</p>
                <p>• <strong>Access Level</strong> - must be "User" or "Admin". Other values are not allowed.</p>
                <p>• <strong>Location</strong> (optional) - created automatically if it doesn't exist</p>
                <p>• <strong>Department</strong> (optional) - created automatically if it doesn't exist</p>
                <p>• <strong>Role</strong> (optional) - created automatically if it doesn't exist. If Department is also provided, the role is linked to that department; otherwise it is created as a general role.</p>
                <p>• <strong>Manager</strong> (optional) - must be specified by email address. If manager email doesn't exist, user will be created but a warning will be reported</p>
                <p>• All other fields (Phone, Employee ID, etc.) are optional and will use default values if not provided</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportUsersDialog;
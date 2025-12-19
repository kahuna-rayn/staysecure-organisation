import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getCurrentClientId } from '@/integrations/supabase/client';
import Papa from 'papaparse';
import { ImportError } from '@/components/import/ImportErrorReport';
import { useQuery } from '@tanstack/react-query';
import { validateManager as validateManagerUtil } from '@/utils/managerValidation';
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
  // Note: username stores the email address in this system
  const { data: existingProfiles } = useQuery({
    queryKey: ['profiles-for-manager-validation'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, username')
        .order('full_name');
      if (error) throw error;
      // Map username to email field for validation (username = email in this system)
      return (data || []).map(profile => ({
        ...profile,
        email: profile.username // username stores the email
      }));
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
    const headers = ['Email', 'Full Name', 'First Name', 'Last Name', 'Phone', 'Employee ID', 'Access Level', 'Location', 'Department', 'Role', 'Manager'];
    const sampleData = [
      ['john.doe@company.com', 'John Doe', 'John', 'Doe', '+1-555-0123', 'EMP-2024-001', 'User', 'Main Office', 'Engineering', 'Software Engineer', 'jane.smith@company.com'],
      ['jane.smith@company.com', 'Jane Smith', 'Jane', 'Smith', '+1-555-0124', 'EMP-2024-002', 'Admin', 'Branch Office', 'Human Resources', 'HR Manager', '']
    ];
    
    const csvContent = [headers, ...sampleData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
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


  // Helper function to validate location
  const validateLocation = (locationName: string): { isValid: boolean; locationId?: string } => {
    if (!locationName || !validLocations) {
      console.log('Location validation: No location name or validLocations not loaded', { locationName, validLocations });
      return { isValid: false };
    }

    const trimmedLocation = locationName.trim();
    console.log('Location validation: Checking location', { 
      providedLocation: trimmedLocation, 
      availableLocations: validLocations.map((l: { name: string }) => l.name) 
    });
    
    const validLocation = validLocations.find(
      (loc: { name: string }) => loc.name.toLowerCase() === trimmedLocation.toLowerCase()
    );

    console.log('Location validation result:', { 
      location: trimmedLocation, 
      found: !!validLocation, 
      validLocation 
    });

    return {
      isValid: !!validLocation,
      locationId: validLocation?.id
    };
  };

  // Helper function to validate department
  const validateDepartment = (departmentName: string): { isValid: boolean; departmentId?: string } => {
    if (!departmentName || !validDepartments) {
      return { isValid: false };
    }

    const trimmedName = departmentName.trim().toLowerCase();
    const department = validDepartments.find(
      (dept: { name: string }) => dept.name.toLowerCase() === trimmedName
    );

    return {
      isValid: !!department,
      departmentId: department?.id
    };
  };

  // Helper function to validate role
  const validateRole = (roleName: string): { isValid: boolean; roleId?: string; departmentId?: string | null } => {
    if (!roleName || !validRoles) {
      return { isValid: false };
    }

    const trimmedName = roleName.trim().toLowerCase();
    const role = validRoles.find(
      (r: { name: string }) => r.name.toLowerCase() === trimmedName
    );

    return {
      isValid: !!role,
      roleId: role?.role_id,
      departmentId: role?.department_id || null
    };
  };

  // Helper function to validate department-role pair
  const validateDepartmentRolePair = (
    departmentName: string,
    roleName: string
  ): { isValid: boolean; error?: string; departmentId?: string; roleId?: string } => {
    // Validate department
    const deptValidation = validateDepartment(departmentName);
    if (!deptValidation.isValid) {
      return { isValid: false, error: `Department "${departmentName}" does not exist` };
    }

    // Validate role
    const roleValidation = validateRole(roleName);
    if (!roleValidation.isValid) {
      return { isValid: false, error: `Role "${roleName}" does not exist or is not active` };
    }

    // Check if role belongs to department or is a general role
    if (roleValidation.departmentId === null) {
      // General role (no department) - valid for any department
      return {
        isValid: true,
        departmentId: deptValidation.departmentId,
        roleId: roleValidation.roleId
      };
    }

    // Role has a department - must match
    if (roleValidation.departmentId !== deptValidation.departmentId) {
      return {
        isValid: false,
        error: `Role "${roleName}" does not belong to department "${departmentName}"`
      };
    }

    return {
      isValid: true,
      departmentId: deptValidation.departmentId,
      roleId: roleValidation.roleId
    };
  };


  // Helper function to validate manager (using utility function)
  const validateManager = (managerIdentifier: string): { isValid: boolean; managerId?: string; isAmbiguous?: boolean; ambiguityDetails?: string } => {
    return validateManagerUtil(managerIdentifier, existingProfiles);
  };

  // Helper function to validate access level
  const validateAccessLevel = (accessLevel: string): { isValid: boolean; value?: string } => {
    if (!accessLevel) {
      return { isValid: false };
    }

    const trimmedLevel = accessLevel.trim().toLowerCase();
    const validLevels = ['user', 'manager', 'client_admin', 'admin', 'author'];
    
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
    
    console.log('Translating error:', { originalError: error, errorMessage });
    
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

  const processUserImport = async (row: any) => {
    const email = row['Email'] || row['email'];
    
    if (!email) {
      console.error('Missing email for row:', row);
      throw new Error('Email address is required for all users.');
    }

    console.log('Processing user:', email);

    // Validate all fields BEFORE creating user
    const accessLevelValue = row['Access Level'] || row['access_level'] || '';
    const accessLevelValidation = validateAccessLevel(accessLevelValue);

    const locationName = row['Location'] || row['location'] || '';
    const departmentName = row['Department'] || row['department'] || '';
    const roleName = row['Role'] || row['role'] || '';

    // Validate location if provided
    if (locationName) {
      const locationValidation = validateLocation(locationName);
      if (!locationValidation.isValid) {
        throw new Error(`Location "${locationName}" does not exist`);
      }
    }

    // Validate department if provided
    let departmentId: string | undefined;
    if (departmentName) {
      const deptValidation = validateDepartment(departmentName);
      if (!deptValidation.isValid) {
        throw new Error(`Department "${departmentName}" does not exist`);
      }
      departmentId = deptValidation.departmentId;
    }

    // Validate role if provided
    let roleId: string | undefined;
    let roleDepartmentId: string | null | undefined;
    if (roleName) {
      const roleValidation = validateRole(roleName);
      if (!roleValidation.isValid) {
        throw new Error(`Role "${roleName}" does not exist or is not active`);
      }
      roleId = roleValidation.roleId;
      roleDepartmentId = roleValidation.departmentId;
    }

    // Validate department-role pair if both provided
    if (departmentName && roleName) {
      const pairValidation = validateDepartmentRolePair(departmentName, roleName);
      if (!pairValidation.isValid) {
        throw new Error(pairValidation.error || 'Invalid department-role pair');
      }
      // Use validated IDs from pair validation
      departmentId = pairValidation.departmentId;
      roleId = pairValidation.roleId;
    } else if (roleName && roleDepartmentId !== null) {
      // Role-only but role has a department - invalid
      throw new Error(`Role "${roleName}" belongs to a department. Please specify the department or use a general role.`);
    }

    // Validate manager if provided
    const managerName = row['Manager'] || row['manager'] || '';
    let managerId: string | undefined;
    let managerWarning: any = null;
    if (managerName) {
      const managerValidation = validateManager(managerName);
      if (!managerValidation.isValid) {
        // Manager doesn't exist - create user anyway but add warning
        managerWarning = {
          field: 'Manager',
          value: managerName,
          message: `Manager "${managerName}" does not exist in the system - user created without manager assignment`
        };
      } else {
        managerId = managerValidation.managerId;
        // If ambiguous (multiple matches by full name), add warning
        if (managerValidation.isAmbiguous) {
          managerWarning = {
            field: 'Manager',
            value: managerName,
            message: managerValidation.ambiguityDetails || `Multiple users found with name "${managerName}" - using first match. Please use email to specify the exact manager.`
          };
        }
      }
    }

    // Extract client path using the same logic as client.ts
    const clientId = getCurrentClientId();
    const clientPath = clientId ? `/${clientId}` : '';
    
    // Use our create-user edge function instead of direct signUp
    const { data: authData, error: authError } = await supabase.functions.invoke('create-user', {
      body: {
        email: email,
        full_name: row['Full Name'] || row['full_name'] || 'Unknown User',
        first_name: row['First Name'] || row['first_name'] || '',
        last_name: row['Last Name'] || row['last_name'] || '',
        username: row['Username'] || row['username'] || '',
        phone: row['Phone'] || row['phone'] || '',
        status: 'Pending',
        employee_id: row['Employee ID'] || row['employee_id'] || '',
        access_level: accessLevelValidation.isValid ? accessLevelValidation.value : 'user',
        manager: managerId || null, // Include manager if validated
        clientPath // Pass client path explicitly
      }
    });

    if (authError) {
      console.error('Auth error for user:', email, authError);
      const friendlyError = translateError(authError);
      throw new Error(friendlyError);
    }

    if (authData && authData.user) {
      console.log('User created successfully:', email);
    } else if (authData && authData.error) {
      console.error('Create user error:', authData.error);
      const friendlyError = translateError(authData.error);
      throw new Error(friendlyError);
    }

    const userId = authData?.user?.id;
    if (!userId) {
      throw new Error('User created but user ID not returned');
    }

    // Collect all warnings
    const warnings = [];
    
    if (!accessLevelValidation.isValid && accessLevelValue) {
      warnings.push({
        field: 'Access Level',
        value: accessLevelValue,
        message: `Access Level "${accessLevelValue}" is invalid - user created with default "User" access level`
      });
    }

    // Add manager warning if manager doesn't exist
    if (managerWarning) {
      warnings.push(managerWarning);
    }

    // Assign location if provided
    if (locationName) {
      const locationValidation = validateLocation(locationName);
      if (locationValidation.isValid && locationValidation.locationId) {
        try {
          const locationData = {
            user_id: userId,
            location_id: locationValidation.locationId,
            full_name: row['Full Name'] || row['full_name'] || 'Unknown User',
            access_purpose: 'General Access',
            status: 'Active',
            date_access_created: new Date().toISOString()
          };

          const { error: locationError } = await supabase
            .from('physical_location_access')
            .insert(locationData);

          if (locationError) {
            console.error('Error assigning location:', locationError);
            warnings.push({
              field: 'Location',
              value: locationName,
              message: `Location "${locationName}" could not be assigned: ${locationError.message}`
            });
          }
        } catch (locationError: any) {
          console.error('Exception assigning location:', locationError);
          warnings.push({
            field: 'Location',
            value: locationName,
            message: `Location "${locationName}" could not be assigned: ${locationError.message}`
          });
        }
      }
    }

    // Assign department and/or role if provided
    if (departmentName || roleName) {
      try {
        // Generate pairing_id if both department and role are provided
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
      warnings: warnings.length > 0 ? warnings : null
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

          console.log('Processing', data.length, 'rows');
          let successCount = 0;
          const errors: ImportError[] = [];
          const warnings: ImportError[] = [];

          // Process users sequentially to avoid overwhelming the system
          for (let i = 0; i < data.length; i++) {
            const row = data[i];
            
            // Skip empty rows
            if (!row['Email'] && !row['email'] && !row['Full Name'] && !row['full_name']) {
              console.log('Skipping empty row at index', i);
              continue;
            }

            const email = row['Email'] || row['email'] || 'Unknown';
            
            try {
              console.log(`Processing user ${i + 1} of ${data.length}:`, email);
              const result = await processUserImport(row);
              successCount++;
              console.log(`Successfully processed user ${i + 1}`);
              
              // Collect all warnings
              if (result.warnings) {
                result.warnings.forEach((warning: any) => {
                  warnings.push({
                    rowNumber: i + 2, // +2 because row 1 is headers, and i is 0-indexed
                    identifier: email,
                    field: warning.field,
                    error: warning.message,
                    rawData: row
                  });
                });
              }
            } catch (error: any) {
              console.error(`Error importing user ${i + 1}:`, error);
              const friendlyError = translateError(error);
              errors.push({
                rowNumber: i + 2, // +2 because row 1 is headers, and i is 0-indexed
                identifier: email,
                field: !row['Email'] && !row['email'] ? 'Email' : undefined,
                error: friendlyError,
                rawData: row
              });
            }

            // Add a small delay between users to prevent rate limiting
            if (i < data.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          }

          console.log('Import completed. Success:', successCount, 'Errors:', errors.length, 'Warnings:', warnings.length);

          setUploadedFile(null);
          setIsProcessing(false);
          setIsOpen(false);

          // Show combined error and warning report through parent component
          if ((errors.length > 0 || warnings.length > 0) && onImportError) {
            setTimeout(() => {
              onImportError(errors, warnings, { success: successCount, total: data.length });
            }, 300);
            
            if (errors.length > 0 && warnings.length > 0) {
              toast({
                title: "Import completed with errors and warnings",
                description: `${successCount} users imported successfully. ${errors.length} failed, ${warnings.length} have validation warnings.`,
                variant: "destructive",
              });
            } else if (errors.length > 0) {
              toast({
                title: "Import completed with errors",
                description: `${successCount} users imported successfully. ${errors.length} failed. Opening error report...`,
                variant: "destructive",
              });
            } else if (warnings.length > 0) {
              toast({
                title: "Import completed with warnings",
                description: `${successCount} users imported successfully. ${warnings.length} users have validation warnings. Opening warning report...`,
                variant: "default",
              });
            }
          } else {
            toast({
              title: "Import completed successfully",
              description: `All ${successCount} users imported successfully. Users will need to activate their accounts via email.`,
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
          <DialogTitle>Import Users</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import users in bulk. Users will be created with authentication accounts and will receive an activation link via email. Departments, roles, and locations can be assigned during import.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
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
              {[
                'Email', 'Full Name', 'First Name', 'Last Name', 
                'Phone', 'Employee ID', 'Access Level', 'Location', 'Department', 'Role', 'Manager'
              ].map((column) => (
                <Badge key={column} variant="outline" className="text-xs">
                  {column}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• <strong>Email</strong> is required for each user</p>
              <p>• Users will be created with 'Pending' status and must activate via email</p>
              <p>• <strong>Location</strong> (optional) - must match an existing active location</p>
              <p>• <strong>Department</strong> (optional) - must match an existing department</p>
              <p>• <strong>Role</strong> (optional) - must match an existing active role</p>
              <p>• If both <strong>Department</strong> and <strong>Role</strong> are provided, the role must belong to that department (or be a general role)</p>
              <p>• If only <strong>Role</strong> is provided, it must be a general role (not assigned to any department)</p>
              <p>• <strong>Manager</strong> (optional) - can be identified by email or full name. If multiple users share the same full name, email must be used to avoid ambiguity. If manager doesn't exist, user will be created but a warning will be reported</p>
              <p>• All other fields are optional and will use default values if not provided</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportUsersDialog;
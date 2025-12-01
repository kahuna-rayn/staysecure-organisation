import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Download, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useOrganisationContext } from '../../context/OrganisationContext';
import Papa from 'papaparse';
import { ImportError } from '../import/ImportErrorReport';

interface ImportRolesDialogProps {
  onImportComplete?: () => Promise<void>;
  onImportError?: (errors: ImportError[], warnings: ImportError[], stats: { success: number; total: number }) => void;
}

const ImportRolesDialog: React.FC<ImportRolesDialogProps> = ({ onImportComplete, onImportError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { supabaseClient } = useOrganisationContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const validTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV or Excel file (.csv, .xlsx, .xls)",
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
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  const generateSampleCSV = () => {
    const headers = ['Name', 'Description', 'Department'];
    const sampleData = [
      ['Senior Developer', 'Senior software developer role', 'Engineering'],
      ['Sales Manager', 'Manages sales team and customer relations', 'Sales'],
      ['HR Coordinator', 'Human resources coordination', 'HR'],
      ['Intern', 'Internship role', '']
    ];
    
    const csvContent = [headers, ...sampleData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'role_import_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper function to validate and find department
  const validateDepartment = async (departmentName: string): Promise<{ isValid: boolean; departmentId?: string }> => {
    if (!departmentName || !departmentName.trim()) {
      return { isValid: false };
    }

    const trimmedName = departmentName.trim();
    
    const { data: department } = await supabaseClient
      .from('departments')
      .select('id')
      .ilike('name', trimmedName)
      .maybeSingle();

    if (department) {
      return { isValid: true, departmentId: department.id };
    }

    return { isValid: false };
  };

  const processRoleImport = async (row: any) => {
    const name = row['Name'] || row['name'];
    
    if (!name || !name.trim()) {
      throw new Error('Role name is required');
    }

    const description = row['Description'] || row['description'] || '';
    const departmentName = row['Department'] || row['department'] || '';

    const warnings = [];
    let departmentId: string | null = null;

    if (departmentName) {
      const departmentValidation = await validateDepartment(departmentName);
      if (departmentValidation.isValid) {
        departmentId = departmentValidation.departmentId || null;
      } else {
        warnings.push({
          field: 'Department',
          value: departmentName,
          message: `Department "${departmentName}" not found - role created without department`
        });
      }
    }

    // Check if role already exists
    const { data: existingRole } = await supabaseClient
      .from('roles')
      .select('role_id')
      .ilike('name', name.trim())
      .maybeSingle();

    if (existingRole) {
      throw new Error(`Role "${name}" already exists`);
    }

    // Create role (always active)
    const { error } = await supabaseClient
      .from('roles')
      .insert([{
        name: name.trim(),
        description: description.trim() || null,
        department_id: departmentId,
        is_active: true,
      }]);

    if (error) {
      throw new Error(error.message || 'Failed to create role');
    }

    return { 
      name, 
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
        complete: async (results: Papa.ParseResult<any>) => {
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

          console.log('Processing', data.length, 'roles');
          let successCount = 0;
          const errors: ImportError[] = [];
          const warnings: ImportError[] = [];

          // Process roles sequentially
          for (let i = 0; i < data.length; i++) {
            const row = data[i];
            
            // Skip empty rows
            if (!row['Name'] && !row['name']) {
              console.log('Skipping empty row at index', i);
              continue;
            }

            const name = row['Name'] || row['name'] || 'Unknown';
            
            try {
              console.log(`Processing role ${i + 1} of ${data.length}:`, name);
              const result = await processRoleImport(row);
              successCount++;
              console.log(`Successfully processed role ${i + 1}`);
              
              // Collect warnings
              if (result.warnings) {
                result.warnings.forEach((warning: any) => {
                  warnings.push({
                    rowNumber: i + 2,
                    identifier: name,
                    field: warning.field,
                    error: warning.message,
                    rawData: row
                  });
                });
              }
            } catch (error: any) {
              console.error(`Error importing role ${i + 1}:`, error);
              errors.push({
                rowNumber: i + 2,
                identifier: name,
                field: !row['Name'] && !row['name'] ? 'Name' : undefined,
                error: error.message || 'Unknown error',
                rawData: row
              });
            }

            // Add a small delay between roles
            if (i < data.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 300));
            }
          }

          console.log('Import completed. Success:', successCount, 'Errors:', errors.length, 'Warnings:', warnings.length);

          setUploadedFile(null);
          setIsProcessing(false);
          setIsOpen(false);

          // Show error/warning report
          if ((errors.length > 0 || warnings.length > 0) && onImportError) {
            setTimeout(() => {
              onImportError(errors, warnings, { success: successCount, total: data.length });
            }, 300);
            
            if (errors.length > 0 && warnings.length > 0) {
              toast({
                title: "Import completed with errors and warnings",
                description: `${successCount} roles imported successfully. ${errors.length} failed, ${warnings.length} have validation warnings.`,
                variant: "destructive",
              });
            } else if (errors.length > 0) {
              toast({
                title: "Import completed with errors",
                description: `${successCount} roles imported successfully. ${errors.length} failed.`,
                variant: "destructive",
              });
            } else if (warnings.length > 0) {
              toast({
                title: "Import completed with warnings",
                description: `${successCount} roles imported successfully. ${warnings.length} have validation warnings.`,
                variant: "default",
              });
            }
          } else {
            toast({
              title: "Import completed successfully",
              description: `All ${successCount} roles imported successfully.`,
            });
          }
          
          // Refresh the role list
          if (onImportComplete) {
            await onImportComplete();
          }
        },
        error: (error: Error) => {
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
        <Button variant="outline" size="icon">
          <Upload className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Roles</DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file to import roles in bulk. Departments can be assigned by name.
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
                <p className="text-lg font-medium text-blue-700">Drop your role file here</p>
              ) : (
                <div>
                  <p className="text-lg font-medium">Drag and drop your role file here, or browse</p>
                  <p className="text-sm text-gray-500 mt-1">Supports CSV and Excel files (.xlsx, .xls)</p>
                </div>
              )}
            </div>

            {uploadedFile && (
              <div className="flex gap-3">
                <Button
                  onClick={handleImport}
                  disabled={isProcessing}
                  size="icon"
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setUploadedFile(null)}
                  disabled={isProcessing}
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Role Import Template</h4>
            <p className="text-sm text-yellow-700 mb-3">Download a template for importing roles with sample data.</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Roles Template (CSV)</span>
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
              {['Name', 'Description', 'Department'].map((column) => (
                <Badge key={column} variant="outline" className="text-xs">
                  {column}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• <strong>Name</strong> is required for each role</p>
              <p>• <strong>Description</strong> is optional</p>
              <p>• <strong>Department</strong> is optional - must match an existing department name</p>
              <p>• All imported roles will be created as <strong>active</strong> by default</p>
              <p>• Duplicate role names will be rejected</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportRolesDialog;


import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
export interface ImportError {
  rowNumber: number;
  identifier: string; // email, name, or other identifying field
  field?: string;
  error: string;
  rawData?: Record<string, string>;
  type?: 'error' | 'warning' | 'info';
}

interface ImportErrorReportProps {
  errors: ImportError[];
  warnings?: ImportError[];
  successCount: number;
  totalCount: number;
  isOpen: boolean;
  onClose: () => void;
  importType: string; // "users", "hardware", "software", etc.
}

export const ImportErrorReport: React.FC<ImportErrorReportProps> = ({
  errors,
  warnings = [],
  successCount,
  totalCount,
  isOpen,
  onClose,
  importType
}) => {
  const infoItems = warnings.filter(w => w.type === 'info');
  const realWarnings = warnings.filter(w => w.type !== 'info');

  // Group info items by user (identifier) → then by row number, so each source row is attributed correctly
  const additionsByUser = infoItems.reduce<Record<string, Record<number, ImportError[]>>>(
    (acc, item) => {
      if (!acc[item.identifier]) acc[item.identifier] = {};
      if (!acc[item.identifier][item.rowNumber]) acc[item.identifier][item.rowNumber] = [];
      acc[item.identifier][item.rowNumber].push(item);
      return acc;
    },
    {}
  );

  const downloadErrorReport = () => {
    const headers = ['Row Number', 'Identifier', 'Field', 'Type', 'Message', 'Raw Data'];
    const allIssues = [
      ...errors.map(err => [err.rowNumber, err.identifier, err.field || 'N/A', 'Error', err.error, err.rawData ? JSON.stringify(err.rawData) : '']),
      ...realWarnings.map(warn => [warn.rowNumber, warn.identifier, warn.field || 'N/A', 'Warning', warn.error, warn.rawData ? JSON.stringify(warn.rawData) : '']),
      ...infoItems.map(info => [info.rowNumber, info.identifier, info.field || 'N/A', 'Added', info.error, info.rawData ? JSON.stringify(info.rawData) : '']),
    ];
    
    const csvContent = [headers, ...allIssues]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `import_report_${new Date().toISOString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const errorRate = totalCount > 0 ? ((errors.length / totalCount) * 100).toFixed(1) : '0';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {errors.length > 0 ? (
              <AlertCircle className="h-5 w-5 text-destructive" />
            ) : realWarnings.length > 0 ? (
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            )}
            Import Report: {importType}
          </DialogTitle>
          <DialogDescription>
            Review the import results and download detailed error and warning information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-700">{successCount}</div>
              <div className="text-sm text-green-600">Successful</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-2xl font-bold text-red-700">{errors.length}</div>
              <div className="text-sm text-red-600">Failed</div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">{realWarnings.length}</div>
              <div className="text-sm text-yellow-600">Warnings</div>
            </div>
            {infoItems.length > 0 ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="text-2xl font-bold text-emerald-700">{infoItems.length}</div>
                <div className="text-sm text-emerald-600">Changes</div>
              </div>
            ) : (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{errorRate}%</div>
                <div className="text-sm text-blue-600">Error Rate</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {(errors.length > 0 || realWarnings.length > 0 || infoItems.length > 0) && (
            <div className="flex gap-2">
              <Button onClick={downloadErrorReport} variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Additions section (update mode) — grouped per user, then per source row */}
          {infoItems.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-emerald-800">
                Changes by user ({Object.keys(additionsByUser).length} user{Object.keys(additionsByUser).length !== 1 ? 's' : ''}, {infoItems.length} change{infoItems.length !== 1 ? 's' : ''})
              </h4>
              <ScrollArea className={`border border-emerald-200 rounded-lg p-4 ${errors.length > 0 || realWarnings.length > 0 ? 'h-[200px]' : 'h-[300px]'}`}>
                <div className="space-y-3">
                  {Object.entries(additionsByUser).map(([email, rowMap]) => (
                    <Alert key={email} variant="default" className="bg-emerald-50 border-emerald-200">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <span className="font-semibold text-sm text-emerald-900">{email}</span>
                          {Object.entries(rowMap).map(([rowNum, items]) => (
                            <div key={rowNum} className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">Row {rowNum}</Badge>
                              {items.map((item, i) => (
                                <Badge key={i} variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                                  {item.field}: {item.error}
                                </Badge>
                              ))}
                            </div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Error/Warning List */}
          {(errors.length > 0 || realWarnings.length > 0) ? (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">
                Issues ({errors.length + realWarnings.length})
              </h4>
              <ScrollArea className="h-[300px] border rounded-lg p-4">
                <div className="space-y-3">
                  {/* Show errors first */}
                  {errors.map((error, index) => (
                    <Alert 
                      key={`error-${index}`} 
                      variant="destructive"
                      className="relative"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="destructive" className="text-xs">
                              Error
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Row {error.rowNumber}
                            </Badge>
                            <span className="font-semibold text-sm">{error.identifier}</span>
                            {error.field && (
                              <Badge variant="secondary" className="text-xs">
                                Field: {error.field}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm mt-1 text-destructive">{error.error}</p>
                          {error.rawData && (
                            <details className="mt-2">
                              <summary className="text-xs cursor-pointer hover:underline">
                                View raw data
                              </summary>
                              <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-x-auto">
                                {JSON.stringify(error.rawData, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                  
                  {/* Show real warnings second */}
                  {realWarnings.map((warning, index) => (
                    <Alert 
                      key={`warning-${index}`} 
                      variant="default"
                      className="relative bg-yellow-50 border-yellow-200 text-yellow-900"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="text-xs bg-yellow-200 text-yellow-800">
                              Warning
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Row {warning.rowNumber}
                            </Badge>
                            <span className="font-semibold text-sm">{warning.identifier}</span>
                            {warning.field && (
                              <Badge variant="secondary" className="text-xs">
                                Field: {warning.field}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm mt-1 text-yellow-800">{warning.error}</p>
                          {warning.rawData && (
                            <details className="mt-2">
                              <summary className="text-xs cursor-pointer hover:underline">
                                View raw data
                              </summary>
                              <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-x-auto">
                                {JSON.stringify(warning.rawData, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : infoItems.length === 0 ? (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                All rows imported successfully! No errors or warnings to report.
              </AlertDescription>
            </Alert>
          ) : null}

          {/* Common Error/Warning Patterns (if we detect them) */}
          {(errors.length > 0 || realWarnings.length > 0) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-yellow-900 mb-2">
                Troubleshooting Tips
              </h4>
              <div className="max-h-32 overflow-y-auto">
                <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside pr-2">
                  {errors.length > 0 && (
                    <>
                      <li>Verify that all required fields are present in your CSV</li>
                      <li>Check for special characters or formatting issues</li>
                      <li>Ensure email addresses are valid and not duplicates</li>
                      <li>Review the error messages for specific guidance</li>
                    </>
                  )}
                  {realWarnings.length > 0 && (
                    <>
                      <li>Users with invalid locations were still created successfully</li>
                      <li>You can assign locations manually after import using the user management interface</li>
                      <li>Check the locations table to see available valid location names</li>
                      <li>Consider updating your import template with correct location names</li>
                    </>
                  )}
                  <li>Download the report to fix issues in bulk</li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
};


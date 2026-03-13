import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash2, Calendar, Eye, Save, Upload, Link, Loader2, FileText } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useOrganisationContext } from '../../context/OrganisationContext';
import { toast } from '@/components/ui/use-toast';
import debug from '../../utils/debug';

interface Document {
  document_id: string;
  title: string;
  description?: string;
  category?: string;
  required: boolean;
  url?: string;
  file_name?: string;
  file_type?: string;
  version: number;
  due_days: number;
  created_at: string;
  updated_at: string;
}

interface DocumentFormData {
  title: string;
  description: string;
  category: string;
  required: boolean;
  url?: string;
  file_name?: string;
  file_type?: string;
  version: number;
  due_days: number;
}

interface DocumentManagementProps {
  onNavigateToAssignments?: () => void;
}

const DocumentManagement: React.FC<DocumentManagementProps> = ({ onNavigateToAssignments: _onNavigateToAssignments }) => {
  const { supabaseClient: supabase } = useOrganisationContext();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [openingDocId, setOpeningDocId] = useState<string | null>(null);

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Document[];
    },
  });

  const createDocumentMutation = useMutation({
    mutationFn: async (documentData: DocumentFormData) => {
      const { error } = await supabase
        .from('documents')
        .insert([documentData]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setIsCreateDialogOpen(false);
      toast({ title: "Success", description: "Document created successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateDocumentMutation = useMutation({
    mutationFn: async (documentData: Partial<DocumentFormData> & { document_id: string }) => {
      const { error } = await supabase
        .from('documents')
        .update(documentData)
        .eq('document_id', documentData.document_id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setEditingDocument(null);
      toast({ title: "Success", description: "Document updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteDocumentMutation = useMutation({
    mutationFn: async (doc: Document) => {
      // Remove the stored file from Storage if present
      if (doc.file_name) {
        await supabase.storage.from('documents').remove([doc.file_name]);
      }
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('document_id', doc.document_id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({ title: "Success", description: "Document deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleOpenDocument = async (doc: Document) => {
    // External URL — open directly without edge function
    if (!doc.file_name && doc.url) {
      window.open(doc.url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (!doc.file_name) return;

    setOpeningDocId(doc.document_id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      debug.log('[DocumentManagement.handleOpenDocument] session present:', !!session);
      debug.log('[DocumentManagement.handleOpenDocument] token prefix:', session?.access_token?.substring(0, 20) ?? 'none');
      debug.log('[DocumentManagement.handleOpenDocument] supabase.functions available:', !!(supabase as any).functions);
      debug.log('[DocumentManagement.handleOpenDocument] document_id:', doc.document_id);

      const { data, error } = await supabase.functions.invoke('get-document-url', {
        body: { document_id: doc.document_id },
      });

      debug.log('[DocumentManagement.handleOpenDocument] invoke result — data:', data, '| error:', error);
      if (error) throw error;
      window.open(data.url, '_blank', 'noopener,noreferrer');
    } catch (err: any) {
      debug.error('[DocumentManagement.handleOpenDocument] error:', err);
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setOpeningDocId(null);
    }
  };

  const filteredDocuments = documents?.filter((doc: Document) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(documents?.map((doc: Document) => doc.category).filter(Boolean)));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Document Management</h2>
          <p className="text-muted-foreground">
            Create and manage organizational documents
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="icon" className="flex items-center gap-2">
              <Plus className="h-4 w-4 mr-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Document</DialogTitle>
              <DialogDescription>
                Add a new document to the knowledge base
              </DialogDescription>
            </DialogHeader>
            <DocumentForm
              supabase={supabase}
              onSubmit={(data) => createDocumentMutation.mutate(data)}
              isSubmitting={createDocumentMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search">Search Documents</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <Label>Filter by Category</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category!}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Document List */}
      <div className="grid gap-4">
        {filteredDocuments?.map((document: Document) => (
          <Card key={document.document_id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{document.title}</CardTitle>
                    {document.required && (
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      v{document.version}
                    </Badge>
                    {document.file_name ? (
                      <Badge variant="secondary" className="text-xs gap-1">
                        <FileText className="h-3 w-3" />
                        File
                      </Badge>
                    ) : document.url ? (
                      <Badge variant="secondary" className="text-xs gap-1">
                        <Link className="h-3 w-3" />
                        URL
                      </Badge>
                    ) : null}
                  </div>
                  {document.description && (
                    <CardDescription className="mt-2">
                      {document.description}
                    </CardDescription>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {(document.url || document.file_name) && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleOpenDocument(document)}
                      disabled={openingDocId === document.document_id}
                      title="View document"
                    >
                      {openingDocId === document.document_id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEditingDocument(document)}
                    title="Edit document"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this document?')) {
                        deleteDocumentMutation.mutate(document);
                      }
                    }}
                    title="Delete document"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Due in {document.due_days} days
                </div>
                {document.category && (
                  <Badge variant="outline" className="text-xs">
                    {document.category}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      {editingDocument && (
        <Dialog open={!!editingDocument} onOpenChange={() => setEditingDocument(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Document</DialogTitle>
              <DialogDescription>
                Update document information
              </DialogDescription>
            </DialogHeader>
            <DocumentForm
              supabase={supabase}
              initialData={editingDocument}
              onSubmit={(data) => updateDocumentMutation.mutate({ ...data, document_id: editingDocument.document_id })}
              isSubmitting={updateDocumentMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// DocumentForm
// ---------------------------------------------------------------------------

interface DocumentFormProps {
  supabase: any;
  initialData?: Document;
  onSubmit: (data: DocumentFormData) => void;
  isSubmitting?: boolean;
}

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  'image/png',
  'image/jpeg',
];

const DocumentForm: React.FC<DocumentFormProps> = ({ supabase, initialData, onSubmit, isSubmitting }) => {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [category, setCategory] = useState(initialData?.category ?? '');
  const [required, setRequired] = useState(initialData?.required ?? false);
  const [version, setVersion] = useState(initialData?.version ?? 1);
  const [dueDays, setDueDays] = useState(initialData?.due_days ?? 30);

  // Source: 'url' or 'file'. Default to 'file' if doc already has a file_name.
  const [sourceType, setSourceType] = useState<'url' | 'file'>(
    initialData?.file_name ? 'file' : 'url'
  );
  const [url, setUrl] = useState(initialData?.url ?? '');

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const existingFileName = initialData?.file_name;
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let file_name = sourceType === 'file' ? existingFileName : undefined;
    let file_type = sourceType === 'file' ? initialData?.file_type : undefined;
    let finalUrl = sourceType === 'url' ? url : undefined;

    if (sourceType === 'file' && selectedFile) {
      setIsUploading(true);
      try {
        // Remove old file if replacing
        if (existingFileName) {
          await supabase.storage.from('documents').remove([existingFileName]);
        }

        const ext = selectedFile.name.split('.').pop();
        const storagePath = `${crypto.randomUUID()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(storagePath, selectedFile, {
            contentType: selectedFile.type,
            upsert: false,
          });

        if (uploadError) throw uploadError;

        file_name = storagePath;
        file_type = selectedFile.type;
        finalUrl = undefined;
      } catch (err: any) {
        toast({ title: "Upload failed", description: err.message, variant: "destructive" });
        return;
      } finally {
        setIsUploading(false);
      }
    }

    onSubmit({
      title,
      description,
      category,
      required,
      url: finalUrl,
      file_name,
      file_type,
      version,
      due_days: dueDays,
    });
  };

  const busy = isUploading || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
            placeholder="e.g., Policy, Training"
          />
        </div>
        <div>
          <Label htmlFor="version">Version</Label>
          <Input
            id="version"
            type="number"
            min="1"
            value={version}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVersion(parseInt(e.target.value) || 1)}
          />
        </div>
      </div>

      {/* Document source toggle */}
      <div>
        <Label>Document Source</Label>
        <div className="flex gap-2 mt-1">
          <Button
            type="button"
            variant={sourceType === 'url' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSourceType('url')}
          >
            <Link className="h-4 w-4 mr-1" />
            External URL
          </Button>
          <Button
            type="button"
            variant={sourceType === 'file' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSourceType('file')}
          >
            <Upload className="h-4 w-4 mr-1" />
            Upload File
          </Button>
        </div>
      </div>

      {sourceType === 'url' ? (
        <div>
          <Label htmlFor="url">Document URL</Label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            placeholder="https://example.com/document.pdf"
          />
        </div>
      ) : (
        <div>
          <Label htmlFor="file">Upload File</Label>
          {existingFileName && !selectedFile && (
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Current file: {existingFileName.split('/').pop()}
            </p>
          )}
          <div
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? (
              <p className="text-sm font-medium">{selectedFile.name}</p>
            ) : (
              <div className="space-y-1">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to select a file</p>
                <p className="text-xs text-muted-foreground">PDF, Word, Excel, PowerPoint, TXT, CSV (max 50 MB)</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={ACCEPTED_TYPES.join(',')}
            onChange={handleFileChange}
          />
        </div>
      )}

      <div>
        <Label htmlFor="due_days">Due Days</Label>
        <Input
          id="due_days"
          type="number"
          min="1"
          value={dueDays}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDays(parseInt(e.target.value) || 30)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="required"
          checked={required}
          onCheckedChange={(val: boolean | 'indeterminate') => setRequired(!!val)}
        />
        <Label htmlFor="required">Required reading</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" size="sm" disabled={busy}>
          {busy ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-1" />
          )}
          {isUploading ? 'Uploading…' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default DocumentManagement;

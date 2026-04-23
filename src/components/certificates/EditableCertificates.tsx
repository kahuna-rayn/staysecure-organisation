
import React, { useRef, useState } from "react";
import { Award, Calendar, Building, FileText, Download, Printer, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { Profile } from '@/hooks/useProfile';
import { useOrganisationContext } from '@/context/OrganisationContext';

interface Certificate {
  id?: string;
  name: string;
  issuedBy: string;
  dateAcquired: string;
  expiryDate: string | null;
  credentialId?: string;
  org_cert?: boolean;
  type?: string;
  status?: string;
  certificate_url?: string | null;
}

interface EditableCertificatesProps {
  profile: Profile & {
    certificates: Certificate[];
  };
  onUpdate?: (certificateId: string, updates: any) => void;
  onDataChange?: () => void;
}

const EditableCertificates: React.FC<EditableCertificatesProps> = ({ profile }) => {
  const { certificates } = profile;
  const { supabaseClient } = useOrganisationContext();
  const printRef = useRef<HTMLDivElement>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handlePrint = useReactToPrint({ contentRef: printRef });

  const handleDownload = async (certId: string) => {
    setDownloadingId(certId);
    try {
      const { data: sessionData } = await supabaseClient.auth.getSession();
      const jwt = sessionData?.session?.access_token;
      if (!jwt) {
        toast.error("Not authenticated");
        return;
      }

      const { data, error } = await supabaseClient.functions.invoke("get-certificate-url", {
        body: { certificate_id: certId },
        headers: { Authorization: `Bearer ${jwt}` },
      });

      if (error || !data?.url) {
        console.error("[EditableCertificates] get-certificate-url error:", error);
        toast.error("Failed to get download link");
        return;
      }

      window.open(data.url, "_blank");
    } catch (err) {
      console.error("[EditableCertificates] download error:", err);
      toast.error("Failed to download certificate");
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No expiry";
    return new Date(dateString).toLocaleDateString();
  };

  const getTypeIcon = (type?: string) => {
    return type === 'Document' ? <FileText className="h-5 w-5 text-primary flex-shrink-0" /> : <Award className="h-5 w-5 text-primary flex-shrink-0" />;
  };

  const getTypeColor = (type?: string) => {
    return type === 'Document' ? 'bg-blue-500' : 'bg-purple-500';
  };

  // Determine validity based on expiry date
  const getValidityStatus = (expiryDate: string | null) => {
    if (!expiryDate) return 'Valid'; // No expiry means always valid
    
    const expiry = new Date(expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    
    if (expiry < today) {
      return 'Expired';
    } else if (expiry <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)) {
      // Expires within 30 days
      return 'Expiring Soon';
    } else {
      return 'Valid';
    }
  };

  const getValidityStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-green-500';
      case 'Expired': return 'bg-red-500';
      case 'Expiring Soon': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  // Filter certificates to only show those where org_cert is false
  const filteredCertificates = (certificates as Certificate[]).filter((cert: Certificate) => 
    cert.org_cert === false
  );

  return (
    <div className="space-y-4 animate-fade-in">
      {filteredCertificates.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No certificates yet</p>
      ) : (
        <>
          {/* Print all button */}
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => handlePrint()} className="print:hidden">
              <Printer className="h-4 w-4 mr-2" />
              Print All
            </Button>
          </div>

          <div ref={printRef} className="space-y-4">
            {filteredCertificates.map((cert: Certificate, index: number) => {
              const validityStatus = getValidityStatus(cert.expiryDate);
              
              return (
                <div key={index} className="border rounded-lg p-4">
                  {/* Top line with name and type badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {getTypeIcon(cert.type)}
                      <h3 className="font-semibold text-lg truncate">{cert.name}</h3>
                    </div>
                    
                    <div className="flex items-center flex-shrink-0">
                      <Badge className={`${getTypeColor(cert.type)} text-white text-sm px-2 py-1`}>
                        {cert.type || 'Certificate'}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Bottom section with aligned information */}
                  <div className="grid grid-cols-4 gap-4 text-sm ml-8">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{cert.issuedBy}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Issued:</span>
                      <span className="font-medium">{formatDate(cert.dateAcquired)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Expires:</span>
                      <span className="font-medium">{formatDate(cert.expiryDate)}</span>
                    </div>
                    
                    <div className="flex items-center justify-end gap-2">
                      <Badge className={`${getValidityStatusColor(validityStatus)} text-white`}>
                        {validityStatus}
                      </Badge>

                      {cert.certificate_url && cert.id && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={downloadingId === cert.id}
                          onClick={() => handleDownload(cert.id!)}
                          className="print:hidden"
                        >
                          {downloadingId === cert.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Download className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* ID information on separate line if present */}
                  {cert.credentialId && (
                    <div className="text-sm ml-8 mt-2">
                      <span className="text-muted-foreground">ID: </span>
                      <span className="font-medium">{cert.credentialId}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default EditableCertificates;

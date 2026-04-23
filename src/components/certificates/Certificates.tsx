
import React, { useRef, useState } from "react";
import { PersonProfile } from "../profile/PersonaProfile";
import { Award, Calendar, Building, FileText, Download, Printer, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { useOrganisationContext } from "../../context/OrganisationContext";

interface CertificatesProps {
  profile: PersonProfile;
}

const Certificates: React.FC<CertificatesProps> = ({ profile }) => {
  const { certificates } = profile;
  const { supabaseClient } = useOrganisationContext();
  const printRef = useRef<HTMLDivElement>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handlePrint = useReactToPrint({ contentRef: printRef });

  const handleDownload = async (certId: string) => {
    if (!certId) {
      toast.error("Certificate ID is missing");
      return;
    }
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
        console.error("[Certificates] get-certificate-url error:", error);
        toast.error("Failed to get download link");
        return;
      }

      window.open(data.url, "_blank");
    } catch (err) {
      console.error("[Certificates] download error:", err);
      toast.error("Failed to download certificate");
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No expiry";
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-green-500';
      case 'Expired': return 'bg-red-500';
      case 'Pending': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getTypeIcon = (type?: string) => {
    return type === 'Document'
      ? <FileText className="h-5 w-5 text-primary flex-shrink-0" />
      : <Award className="h-5 w-5 text-primary flex-shrink-0" />;
  };

  const getTypeColor = (type?: string) => {
    return type === 'Document' ? 'bg-blue-500' : 'bg-purple-500';
  };

  const filteredCertificates = certificates.filter(cert =>
    (cert as any).org_cert === false
  );

  return (
    <div className="space-y-4 animate-fade-in">
      {filteredCertificates.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No certificates yet</p>
      ) : (
        <>
          {/* Print button — prints the entire certificate list */}
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => handlePrint()}>
              <Printer className="h-4 w-4 mr-2" />
              Print All
            </Button>
          </div>

          <div ref={printRef} className="space-y-4">
            {filteredCertificates.map((cert, index) => (
              <div key={index} className="border rounded-lg p-4">
                {/* Top line */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {getTypeIcon((cert as any).type)}
                    <h3 className="font-semibold text-lg truncate">{cert.name}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-base font-medium text-foreground">{cert.issuedBy}</span>
                    </div>
                    {cert.credentialId && (
                      <span className="text-base font-medium text-muted-foreground">
                        ID: {cert.credentialId}
                      </span>
                    )}
                    <Badge className={`${getTypeColor((cert as any).type)} text-white text-sm px-2 py-1 flex-shrink-0`}>
                      {(cert as any).type || 'Certificate'}
                    </Badge>
                  </div>
                </div>

                {/* Bottom line */}
                <div className="grid grid-cols-3 gap-4 text-sm ml-8">
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
                    <Badge className={`${getStatusColor(cert.status)} text-white`}>{cert.status}</Badge>

                    {/* Download button — only shown when PDF has been generated */}
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
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Certificates;

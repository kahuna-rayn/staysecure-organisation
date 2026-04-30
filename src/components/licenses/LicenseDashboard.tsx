import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Key, AlertTriangle, CheckCircle2, Calendar, Users, ExternalLink } from 'lucide-react';
import { useLicenseData, type ProductLicense } from '../../hooks/useLicenseData';
import { useUserRole } from '@/hooks/useUserRole';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function ExpiryBadge({ daysUntilExpiry }: { daysUntilExpiry: number | null }) {
  if (daysUntilExpiry === null) return null;
  if (daysUntilExpiry < 0)
    return <Badge variant="destructive">Expired</Badge>;
  if (daysUntilExpiry <= 30)
    return <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50">Expires in {daysUntilExpiry}d</Badge>;
  return <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">{daysUntilExpiry}d remaining</Badge>;
}

function ProductSummaryCard({ product, isSuperAdmin }: { product: ProductLicense; isSuperAdmin: boolean }) {
  const pct = Math.min(product.pctUsed * 100, 100);
  const barColor = product.isAtCapacity ? 'bg-destructive' : product.isNearCapacity ? 'bg-amber-500' : 'bg-green-500';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <Key className="h-4 w-4 text-muted-foreground" />
            {product.productName}
          </CardTitle>
          <CardDescription>Seat consumption</CardDescription>
        </div>
        {isSuperAdmin && (
          <a
            href="https://license.raynsecure.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Manage <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Seat bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              {product.usedSeats} of {product.seats} seats used
            </span>
            <span className="text-muted-foreground">{product.availableSeats} available</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-end">
            {product.isAtCapacity ? (
              <Badge variant="destructive">At capacity</Badge>
            ) : product.isNearCapacity ? (
              <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50">
                {Math.round(pct)}% used
              </Badge>
            ) : (
              <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">
                <CheckCircle2 className="h-3 w-3 mr-1" />{Math.round(pct)}% used
              </Badge>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="flex flex-wrap gap-4 border-t pt-3">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Start
            </p>
            <p className="text-sm font-medium">{formatDate(product.startDate)}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
              <Calendar className="h-3 w-3" /> End
            </p>
            <p className="text-sm font-medium">{formatDate(product.endDate)}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
            <ExpiryBadge daysUntilExpiry={product.daysUntilExpiry} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const LicenseDashboard: React.FC = () => {
  const { data, isLoading, error } = useLicenseData();
  const { isSuperAdmin } = useUserRole();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-12 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading license information...
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Failed to load license data</AlertTitle>
        <AlertDescription>{(error as Error).message ?? 'An unexpected error occurred.'}</AlertDescription>
      </Alert>
    );
  }

  if (!data || data.products.length === 0) {
    return (
      <Alert>
        <Key className="h-4 w-4" />
        <AlertTitle>No licenses found</AlertTitle>
        <AlertDescription>
          No product licenses are configured for this organisation.{' '}
          {isSuperAdmin && (
            <a href="https://license.raynsecure.com" target="_blank" rel="noopener noreferrer"
              className="underline inline-flex items-center gap-1">
              Manage licenses <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // Capacity alerts for any at/near-capacity products
  const atCapacity = data.products.filter(p => p.isAtCapacity);
  const nearCapacity = data.products.filter(p => !p.isAtCapacity && p.isNearCapacity);

  // Group assignments by user for the Staff Roster-style table
  type UserGroup = {
    userId: string;
    userName: string | null;
    userEmail: string | null;
    licenses: Array<{ productName: string; accessLevel: string }>;
  };

  const userMap = new Map<string, UserGroup>();
  (data.assignments ?? []).forEach(a => {
    if (!userMap.has(a.userId)) {
      userMap.set(a.userId, {
        userId: a.userId,
        userName: a.userName,
        userEmail: a.userEmail,
        licenses: [],
      });
    }
    userMap.get(a.userId)!.licenses.push({
      productName: a.productName,
      accessLevel: a.accessLevel,
    });
  });

  const userGroups = Array.from(userMap.values()).sort((a, b) =>
    (a.userName ?? '').localeCompare(b.userName ?? '')
  );

  return (
    <div className="space-y-6">
      {/* Capacity alerts */}
      {atCapacity.map(p => (
        <Alert key={p.licenseId} variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{p.productName} — All seats in use</AlertTitle>
          <AlertDescription className="flex items-center justify-between flex-wrap gap-2">
            <span>All {p.seats} seats are in use. New users cannot be added until a seat is freed.</span>
            {isSuperAdmin && (
              <a href="https://license.raynsecure.com" target="_blank" rel="noopener noreferrer"
                className="underline inline-flex items-center gap-1 whitespace-nowrap">
                Add more seats <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </AlertDescription>
        </Alert>
      ))}
      {nearCapacity.map(p => (
        <Alert key={p.licenseId} className="border-amber-300 bg-amber-50 text-amber-900">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">{p.productName} — Approaching seat limit</AlertTitle>
          <AlertDescription className="flex items-center justify-between flex-wrap gap-2 text-amber-700">
            <span>{p.usedSeats} of {p.seats} seats in use ({Math.round(p.pctUsed * 100)}%).</span>
            {isSuperAdmin && (
              <a href="https://license.raynsecure.com" target="_blank" rel="noopener noreferrer"
                className="underline inline-flex items-center gap-1 whitespace-nowrap">
                Increase your limit <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </AlertDescription>
        </Alert>
      ))}

      {/* Per-product summary cards — preferred display order */}
      {(() => {
        const ORDER = ['LEARN', 'SHIELD', 'GOVERN', 'READY'];
        const sortedProducts = [...data.products].sort((a, b) => {
          const ai = ORDER.findIndex(k => a.productName.toUpperCase().includes(k));
          const bi = ORDER.findIndex(k => b.productName.toUpperCase().includes(k));
          return (ai === -1 ? ORDER.length : ai) - (bi === -1 ? ORDER.length : bi);
        });
        return (
          <div className={`grid gap-4 ${sortedProducts.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-lg'}`}>
            {sortedProducts.map(p => (
              <ProductSummaryCard key={p.licenseId} product={p} isSuperAdmin={isSuperAdmin} />
            ))}
          </div>
        );
      })()}

      {/* Assigned users table — Staff Roster style */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Users</CardTitle>
          <CardDescription>
            Users who currently hold a license seat. Remove a user to free a seat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {userGroups.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">No seats are currently assigned.</p>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-[480px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-10 bg-muted">
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-2 font-medium text-muted-foreground">Email / Username</th>
                      <th className="text-left p-2 font-medium text-muted-foreground">Product</th>
                      <th className="text-left p-2 font-medium text-muted-foreground">Access Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userGroups.flatMap((user) =>
                      user.licenses.map((lic, licIdx) => (
                        <tr key={`${user.userId}-${licIdx}`} className="border-b last:border-0">
                          {licIdx === 0 && (
                            <>
                              <td
                                className="p-2 font-medium align-top border-r"
                                rowSpan={user.licenses.length}
                              >
                                {user.userName ?? '—'}
                              </td>
                              <td
                                className="p-2 text-muted-foreground align-top border-r"
                                rowSpan={user.licenses.length}
                              >
                                {user.userEmail ?? '—'}
                              </td>
                            </>
                          )}
                          <td className="p-2">{lic.productName}</td>
                          <td className="p-2">
                            <Badge variant="outline" className="capitalize">
                              {lic.accessLevel.replace('_', ' ')}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LicenseDashboard;

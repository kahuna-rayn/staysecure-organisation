import { useQuery } from '@tanstack/react-query';
import { useOrganisationContext } from '../context/OrganisationContext';

export interface ProductLicense {
  licenseId: string;
  productId: string;
  productName: string;
  seats: number;
  usedSeats: number;
  availableSeats: number;
  pctUsed: number;
  isNearCapacity: boolean;
  isAtCapacity: boolean;
  startDate: string | null;
  endDate: string | null;
  daysUntilExpiry: number | null;
}

export interface LicenseAssignment {
  userId: string;
  userName: string | null;
  userEmail: string | null;
  licenseId: string;
  productId: string;
  productName: string;
  accessLevel: string;
}

export interface LicenseData {
  products: ProductLicense[];
  assignments: LicenseAssignment[];
}

const NEAR_CAPACITY_THRESHOLD = 0.8;

export function useLicenseData() {
  const { supabaseClient } = useOrganisationContext();

  return useQuery<LicenseData>({
    queryKey: ['license-data'],
    queryFn: async () => {
      // 1. Fetch all customer product licenses joined with products for names
      const { data: licenses, error: licenseError } = await supabaseClient
        .from('customer_product_licenses')
        .select('id, product_id, seats, start_date, end_date, products(name)');

      if (licenseError) throw licenseError;
      if (!licenses || licenses.length === 0) return { products: [], assignments: [] };

      const licenseIds = licenses.map(l => l.id);

      // 2. Fetch all license assignments for this client's licenses
      const { data: rawAssignments, error: assignError } = await supabaseClient
        .from('product_license_assignments')
        .select('id, license_id, user_id, access_level, profiles(full_name, username)')
        .in('license_id', licenseIds);

      if (assignError) throw assignError;

      // 3. Build counts per license
      const countByLicense = new Map<string, number>();
      (rawAssignments ?? []).forEach(a => {
        countByLicense.set(a.license_id, (countByLicense.get(a.license_id) ?? 0) + 1);
      });

      const msPerDay = 1000 * 60 * 60 * 24;

      // 4. Build product summaries
      const products: ProductLicense[] = licenses.map(l => {
        const used = countByLicense.get(l.id) ?? 0;
        const total = l.seats ?? 0;
        const available = Math.max(total - used, 0);
        const pctUsed = total > 0 ? used / total : 0;
        const daysUntilExpiry = l.end_date
          ? Math.ceil((new Date(l.end_date).getTime() - Date.now()) / msPerDay)
          : null;

        return {
          licenseId: l.id,
          productId: l.product_id,
          productName: (l.products as any)?.name ?? 'Unknown Product',
          seats: total,
          usedSeats: used,
          availableSeats: available,
          pctUsed,
          isNearCapacity: total > 0 && pctUsed >= NEAR_CAPACITY_THRESHOLD,
          isAtCapacity: total > 0 && used >= total,
          startDate: l.start_date ?? null,
          endDate: l.end_date ?? null,
          daysUntilExpiry,
        };
      });

      // 5. Build per-user assignments with product name
      const licenseProductMap = new Map(licenses.map(l => [l.id, (l.products as any)?.name ?? 'Unknown Product']));
      const licenseProductIdMap = new Map(licenses.map(l => [l.id, l.product_id]));

      const assignments: LicenseAssignment[] = (rawAssignments ?? []).map(a => ({
        userId: a.user_id,
        userName: (a.profiles as any)?.full_name ?? null,
        userEmail: (a.profiles as any)?.username ?? null,
        licenseId: a.license_id,
        productId: licenseProductIdMap.get(a.license_id) ?? '',
        productName: licenseProductMap.get(a.license_id) ?? 'Unknown Product',
        accessLevel: a.access_level,
      }));

      return { products, assignments };
    },
    staleTime: 1000 * 60 * 2,
  });
}

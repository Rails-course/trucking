export type Order = 'asc' | 'desc';

export interface ConsignmentData {
  id: number;
  bundle_seria: string;
  bundle_number: string;
  consignment_seria: string;
  consignment_number: string;
  driver: string;
  truck: string;
}

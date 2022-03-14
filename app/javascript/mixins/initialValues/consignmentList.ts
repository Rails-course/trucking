export type Order = 'asc' | 'desc';

export interface ConsignmentData {
  bundle_seria: string;
  bundle_number: string;
  consignment_seria: string;
  consignment_number: number;
  good_name: string;
  unit_of_measurement: string;
  quantity: number;
  driver: string;
  truck: string;
}

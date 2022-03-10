export interface consignmentFormValues {
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

const consignmentInitialValues: consignmentFormValues = {
  bundle_seria: '',
  bundle_number: '',
  consignment_seria: '',
  consignment_number: 0,
  good_name: '',
  unit_of_measurement: '',
  quantity: 0,
  driver: '',
  truck: '',
};

export default consignmentInitialValues;

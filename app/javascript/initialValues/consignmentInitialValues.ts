export interface consignmentFormValues {
  bundle_seria: string;
  bundle_number: string;
  consignment_seria: string;
  consignment_number: string;
  driver: string;
  truck: string;
  dispatcher: { first_name: string, second_name: string, middle_name: string };
}

const consignmentInitialValues: consignmentFormValues = {
  bundle_seria: '',
  bundle_number: '',
  consignment_seria: '',
  consignment_number: '',
  driver: '',
  truck: '',
  dispatcher: { first_name: '', second_name: '', middle_name: '' },
};

export default consignmentInitialValues;

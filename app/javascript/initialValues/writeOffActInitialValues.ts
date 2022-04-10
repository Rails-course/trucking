export interface writeOffActFormValues {
  good_name: string;
  lost_quantity: number;
  consignment: any;
  description: string;
}

export const writeOffActInitialValues: writeOffActFormValues = {
  good_name: '',
  lost_quantity: 0,
  consignment: null,
  description: '',
};

export default writeOffActInitialValues;

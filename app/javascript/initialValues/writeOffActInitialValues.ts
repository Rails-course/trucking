export interface writeOffActFormValues {
  good_name: string;
  lost_quantity: number;
  consignment: any;
}

export const writeOffActInitialValues: writeOffActFormValues = {
  good_name: '',
  lost_quantity: 0,
  consignment: null,
};

export default writeOffActInitialValues;

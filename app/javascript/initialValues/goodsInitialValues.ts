export interface goodsFormValues {
  bundle_seria: string;
  bundle_number: string;
  good_name: string;
  unit_of_measurement: string;
  quantity: number;
}

const goodsInitialValues: goodsFormValues = {
  bundle_seria: '',
  bundle_number: '',
  good_name: '',
  unit_of_measurement: '',
  quantity: 0,
};

export default goodsInitialValues;

// NOTE: this file is probably unnecessary due to refactor of creating consignment goods
export interface goodsFormValues {
  good_name: string;
  unit_of_measurement: string;
  quantity: number;
}

const goodsInitialValues: goodsFormValues = {
  good_name: '',
  unit_of_measurement: '',
  quantity: 0,
};

export default goodsInitialValues;

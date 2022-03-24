export interface warehouseFormValues {
  warehouse_name: string;
  apartment: string;
  building: string;
  street: string;
  town: string;
  warehouseman: {
    first_name: string, second_name: string, middle_name: string
  }
}

const userInitialValues: warehouseFormValues = {
  warehouse_name: '',
  apartment: '',
  building: '',
  street: '',
  town: '',
  warehouseman: {
    first_name: '', second_name: '', middle_name: ''
  }
};

export default userInitialValues;

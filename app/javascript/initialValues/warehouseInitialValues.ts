export interface warehouseFormValues {
  warehouse_name: string;
  apartment: string;
  building: string;
  street: string;
  town: string;
}

const userInitialValues: warehouseFormValues = {
  warehouse_name: '',
  apartment: '',
  building: '',
  street: '',
  town: '',
};

export default userInitialValues;

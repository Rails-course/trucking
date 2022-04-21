export interface waybillFormValues {
  waybill_seria: string,
  waybill_number: string,
  consignment_id: number,
  end_town: string,
  end_street: string,
  end_building: number,
  town: string,
  street: string,
  building: number,
  end_date: string,
  start_date: string,
  goods_owner: string,
}

export const waybillInitialValues: waybillFormValues = {
  waybill_seria: '',
  waybill_number: '',
  consignment_id: undefined,
  end_town: '',
  end_street: '',
  end_building: 0,
  town: '',
  street: '',
  building: 0,
  end_date: '',
  start_date: '',
  goods_owner: '',
};

export default waybillInitialValues;

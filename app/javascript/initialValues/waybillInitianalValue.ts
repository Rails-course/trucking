export interface waybillFormValues {
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
  consignment_id: undefined,
  end_town: '',
  end_street: '',
  end_building: undefined,
  town: '',
  street: '',
  building: undefined,
  end_date: '',
  start_date: '',
  goods_owner: '',
};

export default waybillInitialValues;

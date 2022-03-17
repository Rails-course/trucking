
export interface waybillFormValues {
    ttn_id:number,
    end_town:string,
    end_street:string,
    end_building:number,
    town:string,
    street:string,
    building:number,
    end_date:string,
    start_date:string
}

const waybillInitialValues: waybillFormValues = {
    ttn_id:0,
    end_town:'',
    end_street:'',
    end_building:0,
    town:'',
    street:'',
    building:0,
    end_date:'',
    start_date:''
};
export default waybillInitialValues;
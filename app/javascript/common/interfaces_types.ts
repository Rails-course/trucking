import * as React from 'react';
import { consignmentFormValues } from '../initialValues/consignmentInitialValues';
import { goodsFormValues } from '../initialValues/goodsInitialValues';
import { Order, UserData } from '../mixins/initialValues/userList';

// INTERFACES
export interface CreateConsignmentFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    handleSubmit: any;
    newGoods: any;
    handleFieldAdd: any;
    handleFieldChange: any;
}

export interface WarehouseData {
    id: number;
    warehouse_name: string;
    trusted: boolean;
}

export interface WriteOffActTableProps {
    writeOffActs: any,
    setWriteOffActs: any,
}

export interface CreateWriteOffActFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    handleSubmit: any;
}

export interface CreateWaybillsFormProps {
    id: number;
    status: string;
    waybillStatus: string;
}

export interface CreateRoutesFormProps {
    isActiveModal: boolean;
    routeHandleClose: () => void;
    setRoutes: any, routes: any
}

export interface WarehouseTableProps {
    warehouses: WarehouseData[];
    setWarehouses: any;
}

export interface CreateFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    handleSubmit: any;
}

export interface Warehouseman {
    id: number;
    first_name: string;
    second_name: string;
    middle_name: string;
    email: string;
    birthday: any;
    login: string;
    passport: string;
}

export interface EnhancedTableProps {
    users: any;
    setUser: any;
    userIds: number[];
    setUserId: any;
    setEditUserModal: any;
}

export interface EnhancedHeadTableProps {
    numSelected: number;
    // eslint-disable-next-line no-unused-vars
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof UserData) => void;
    // eslint-disable-next-line no-unused-vars
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

// TYPES
export type Driver = {
    id: number;
    first_name: string;
    second_name: string;
    middle_name: string;
    email: string;
    birthday: any;
    login: string;
    passport: string;
}

export type Truck = {
    id: number;
    truck_number: string;
    fuel_consumption: number;
}

export type Item = {
    id: number;
    good_name: string;
    quantity: number;
    unit_of_measurement: string;
    bundle_seria: string;
    bundle_number: string;
}

export type UnionConsGoodType = { consignment: consignmentFormValues } | { goods: goodsFormValues }

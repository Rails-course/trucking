import * as React from 'react';
import { AlertColor } from '@mui/material';
import { Order, UserData } from '../mixins/initialValues/userList';
import { consignmentFormValues } from '../initialValues/consignmentInitialValues';
import { userFormValues } from '../initialValues/userInitialValues';

/* eslint-disable no-unused-vars */

// TYPES
export type Driver = {
    id: number;
    first_name: string;
    second_name: string;
    middle_name: string;
    email: string;
    birthday: Date;
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
    status: string;
    unit_of_measurement: string;
    bundle_seria: string;
    bundle_number: string;
}

export type CompanyType = {
    id: number;
    name: string;
}

export type RoleType = {
    id: number;
    role_name: string;
}

export type AlertType = {
    alertType: AlertColor;
    alertText: string;
    open: boolean;
}

export type NewGoods = {
    good_name: string;
    quantity: number;
    unit_of_measurement: string;
}

export type CheckpointsType = {
    id: number;
    city: string;
    is_passed: boolean;
    pass_date: Date;
}

export type OwnersType = {
    goods_owner_name: string;
}

export type WaybillDataType = {
    truck_number: string;
    driver_fio: string;
}

export type ConsignmentType = {
    id: number;
    status: string;
    bundle_seria: string;
    bundle_number: string;
    consignment_seria: string;
    consignment_number: string;
    driver: string;
    truck: string;
    dispatcher: { first_name: string, second_name: string, middle_name: string };
    manager: { first_name: string, second_name: string, middle_name: string };
}

export type WaybillType = {
    id: number;
    status: string;
    waybill_seria: string;
    waybill_number: number;
    startpoint: string;
    endpoint: string;
}

// INTERFACES
export interface CreateConsignmentFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    handleSubmit: (consignment: consignmentFormValues) => void;
    newGoods: NewGoods[], trucksJSON: [], driversJSON: [];
    handleFieldAdd: () => void;
    handleFieldChange: (e: NewGoods, index: number) => void;
    formErrors: object;
    trucks: [], drivers: [];
}

export interface WarehouseData {
    id: number;
    warehouse_name: string;
    trusted: boolean;
}

export interface WriteOffActTableProps {
    writeOffActs: string, searchData: any;
}

export interface CreateWriteOffActFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    handleSubmit: (writeOffAct) => void;
    formErrors: object;
    consignmentsJSON: string;
    setAlertData: (data: AlertType) => void;
}

export interface CreateWaybillsFormProps {
    id: number;
    handleClose: () => void;
    formWaybillErrors: object;
    isActiveWayBill: boolean;
    setWayBillActive: (x: boolean) => void;
    data: WaybillDataType;
    setAlertData: (data: AlertType) => void;
    setConsignment: (consignment: ConsignmentType[]) => void;
    consignments: ConsignmentType[];
    warehouses: [];
    goodsOwners: [];
}

export interface WarehouseTableProps {
    warehouses: WarehouseData[];
    setWarehouses: (warehouse: WarehouseData[]) => void;
    currentUserRole: string;
    setAlertData: (alert: AlertType) => void;
    searchData: any;
}

export interface CreateWarehouseFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    setWarehouses: (warehouse: WarehouseData[]) => void;
    formErrors: object,
    setFormErrors: any,
    setAlertData: (alert: AlertType) => void;
    warehousemansData: [];
}

export interface Warehouseman {
    id: number;
    first_name: string;
    second_name: string;
    middle_name: string;
    email: string;
    birthday: Date;
    login: string;
    passport: string;
}

export interface EnhancedTableProps {
    users: UserData[];
    setUser: (user: UserData[]) => void;
    setEditUserModal: (id: number) => void;
    searchData: any;
    setUpdateModalActive: (x: boolean) => void;
}

export interface EnhancedHeadTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof UserData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export interface EnhancedTableToolbarProps {
    numSelected: number;
    users: UserData[];
    setUser: (user: UserData[]) => void;
    selectedUsersIds: any;
    setSelectedUsersIds: any;
}

export interface UserCreateFormProps {
    createModal: boolean, updateModal: boolean;
    handleClose: () => void;
    editUserModal: number;
    title: string, btnTitle: string;
    roles: RoleType[];
    handleSubmit: (user: userFormValues) => void;
    companies: CompanyType[];
    formErrors: object;
}

export interface CheckpointWindowFormProps {
    checkpointID: number,
    status: boolean,
    currentUserRole: string;
    setAlertData: (data: AlertType) => void;
    setCheckpoints: (checkpoint: CheckpointsType[]) => void;
    checkpoints: any;
}

export interface CheckpointsFormProps {
    id: number,
    isWaybillModal: boolean;
    setWaybillModalActive: (boolean) => void;
    checkpoints: CheckpointsType[];
    currentUserRole: string;
    setAlertData: (data: AlertType) => void;
    handleSubmitWaybill: (id: number) => void,
    formErrorsCheckpoints: object,
    setCheckpoints: (checkpoint: CheckpointsType[]) => void;
}

export interface ConsignmentGoodsProps {
    isActiveModal: boolean;
    handleClose: () => void;
    goods: Item[];
    selectedGoods: Item[];
    setTitleStatus: (x: string) => void;
    setSelectedGoods: (selectedGoods: Item[]) => void;
    handleGoodsSubmit: () => void;
    currentUserRole: string;
    titleStatus: string;
}

export interface ConsignmentTableProps {
    setModalGoodsActive: (x: boolean) => void;
    setWayBillActive: (x: boolean) => void;
    setGoods: (goods: Item[]) => void,
    setConsID: (consID: number) => void, 
    formErrors: object;
    consignments: ConsignmentType[], 
    setCreateWaybillData: any;
    currentUserRole: string
    searchData: any;
}

export interface CreateCompanyFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    setCompany: (company: CompanyType[]) => void;
    formErrors: object;
    setFormErrors: (e: []) => void;
    setAlertData: (alert: AlertType) => void;
}

export interface CompanyTableProps {
    companies: CompanyType[]; 
    setCompany: (company: CompanyType[]) => void;
    setAlertData: (alert: AlertType) => void;
    searchData: any;
    suspendCompany: (id: number) => void, resumeCompany: (id: number) => void;
}

export interface WaybillTableProps {
    waybills: WaybillType[];
    searchData: any;
    setCheckpoints: (checkpoints: CheckpointsType[]) => void;
    setWaybillModalActive: (boolean) => void;
    setWaybillID: (wayID: number) => void;
}

export interface WaybillProps {
    currentUserRole: string;
    waybillsJSON: [];
}

export interface SiteAlertProps {
    alertData: AlertType; setAlertData: (data: AlertType) => void;
}

export interface SearchProps {
    setData:any;
    Data:any;
    keyField: string;
}

export interface ConsignmentProps {
    currentUserRole: string;
    consignmentsJSON: string;
    trucksJSON: string, driversJSON: string,
    warehousesJSON: string; goodsOwnersJSON: string,
}

export interface WriteOffActsProps {
    currentUserRole: string;
    writeOffActsJSON: string;
    consignmentsJSON: string;
}

export interface WarehouseProps {
    currentUserRole: string;
    warehousesJSON: string;
    warehousemansData: [];
}

export interface CompanyProps {
    currentUserRole: string;
    companiesJSON: string;
}

export interface UsersProps {
    usersJSON: string, rolesJSON: string, companiesJSON: string;
}

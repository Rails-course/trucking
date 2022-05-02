import * as React from 'react';
import { AlertColor } from '@mui/material';
import { Order, UserData } from '../mixins/initialValues/userList';
import { consignmentFormValues } from '../initialValues/consignmentInitialValues';
import { userFormValues } from '../initialValues/userInitialValues';

/* eslint-disable no-unused-vars */

// TYPES
export type User = {
    id: number;
    first_name: string;
    middle_name: string;
    second_name: string;
    email: string;
    login: string;
    password: string;
    password_confirmation: string;
    birthday: string;
    address: { town: string, street: string, building: number, apartment: number, }
    role: { role_name: string },
    passport: string,
    company: string,
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

export type GoodsOwnerType = {
    goods_owner_name: string;
}

export type AlertType = {
    alertType: AlertColor;
    alertText: string;
    open: boolean;
}

export type WriteOffAct = {
    id: number;
    good_name: string;
    description: string;
    lost_quantity: number;
    consignment: ConsignmentType;
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

export type GoodsOwnersType = {
    goods_owner_name: string;
}

export type CreateWaybillDataType = {
    truckNumber: string;
    driverFio: string;
}

export type ConsignmentType = {
    id: number;
    status: string;
    bundle_seria: string;
    bundle_number: string;
    consignment_seria: string;
    consignment_number: string;
    dispatcher: { first_name: string, second_name: string, middle_name: string };
    manager: { first_name: string, second_name: string, middle_name: string };
    driver: { first_name: string, second_name: string, middle_name: string };
    truck: { truck_number: string };
    waybill: WaybillType;
}

export type WaybillType = {
    id: number;
    status: string;
    waybill_seria: string;
    waybill_number: number;
    startpoint: string, endpoint: string;
}

// INTERFACES
export interface CreateConsignmentFormProps {
    isActiveModal: boolean;
    newGoods: NewGoods[];
    formErrors: object;
    trucks: Truck[];
    drivers: User[];
    handleClose: () => void;
    handleSubmit: (consignment: consignmentFormValues) => void;
    handleFieldAdd: () => void;
    handleFieldChange: (e: NewGoods, index: number) => void;
}
export interface Warehouse {
    id: number;
    warehouse_name: string;
    trusted: boolean;
    warehouseman: User;
}

export interface WriteOffActTableProps {
    writeOffActs: WriteOffAct[],
    searchData: any;
}

export interface CreateWriteOffActFormProps {
    isActiveModal: boolean;
    formErrors: object;
    consignments: ConsignmentType[];
    handleClose: () => void;
    handleSubmit: (writeOffAct) => void;
    setAlertData: (alert: AlertType) => void;
}

export interface CreateWaybillsFormProps {
    id: number;
    formWaybillErrors: object;
    isActiveWayBill: boolean;
    createWaybillData: CreateWaybillDataType;
    consignments: ConsignmentType[];
    warehouses: Warehouse[];
    goodsOwners: GoodsOwnersType[];
    setWayBillActive: (waybillActive: boolean) => void;
    handleClose: () => void;
    setAlertData: (alert: AlertType) => void;
    setConsignment: (consignment: ConsignmentType[]) => void;
}

export interface WarehouseTableProps {
    warehouses: Warehouse[];
    currentUserRole: string;
    searchData: any;
    setWarehouses: (warehouses: Warehouse[]) => void;
    setAlertData: (alert: AlertType) => void;
}

export interface CreateWarehouseFormProps {
    isActiveModal: boolean;
    formErrors: object,
    warehousemans: User[];
    handleClose: () => void;
    setWarehouses: (warehouses: Warehouse[]) => void;
    setFormErrors: (errors: []) => void;
    setAlertData: (alert: AlertType) => void;
}

export interface EnhancedTableProps {
    users: UserData[];
    searchData: any;
    setUser: (user: UserData[]) => void;
    setEditUserModal: (id: number) => void;
    setUpdateModalActive: (updateModalActive: boolean) => void;
}

export interface EnhancedHeadTableProps {
    numSelected: number;
    order: Order;
    orderBy: string;
    rowCount: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof UserData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface EnhancedTableToolbarProps {
    numSelected: number;
    users: UserData[];
    selectedUsersIds: number[];
    setUser: (user: UserData[]) => void;
    setSelectedUsersIds: (selectedUsersIds: number[]) => void;
}

export interface UserCreateFormProps {
    createModal: boolean, updateModal: boolean;
    editUserModal: number;
    title: string, btnTitle: string;
    roles: RoleType[];
    formErrors: object;
    companies: CompanyType[];
    handleClose: () => void;
    handleSubmit: (user: userFormValues) => void;
}

export interface CheckpointWindowFormProps {
    checkpointID: number,
    status: boolean,
    currentUserRole: string;
    checkpoints: CheckpointsType[];
    setAlertData: (alert: AlertType) => void;
    setCheckpoints: (checkpoints: CheckpointsType[]) => void;
}

export interface CheckpointsFormProps {
    id: number,
    isWaybillModal: boolean;
    checkpoints: CheckpointsType[];
    currentUserRole: string;
    formErrorsCheckpoints: object,
    setWaybillModalActive: (activeWaybillModal: boolean) => void;
    setAlertData: (alert: AlertType) => void;
    handleSubmitWaybill: (id: number) => void,
    setCheckpoints: (checkpoints: CheckpointsType[]) => void;
}

export interface ConsignmentGoodsProps {
    isActiveModal: boolean;
    goods: Item[];
    selectedGoods: Item[];
    currentUserRole: string;
    titleStatus: string;
    handleClose: () => void;
    setTitleStatus: (titleStatus: string) => void;
    setSelectedGoods: (selectedGoods: Item[]) => void;
    handleGoodsSubmit: () => void;
}

export interface ConsignmentTableProps {
    formErrors: object;
    consignments: ConsignmentType[];
    currentUserRole: string;
    searchData: any;
    setModalGoodsActive: (modalGoodsActive: boolean) => void;
    setWayBillActive: (waybillActive: boolean) => void;
    setGoods: (goods: Item[]) => void;
    setConsID: (consID: number) => void;
    setCreateWaybillData: (createWaybillData: CreateWaybillDataType) => void;
}

export interface CreateCompanyFormProps {
    isActiveModal: boolean;
    formErrors: object;
    handleClose: () => void;
    setCompany: (company: CompanyType[]) => void;
    setFormErrors: (errors: []) => void;
    setAlertData: (alert: AlertType) => void;
}

export interface CompanyTableProps {
    companies: CompanyType[];
    searchData: any;
    setCompany: (company: CompanyType[]) => void;
    setAlertData: (alert: AlertType) => void;
    suspendCompany: (id: number) => void, resumeCompany: (id: number) => void;
}

export interface WaybillTableProps {
    waybills: WaybillType[];
    searchData: any;
    setCheckpoints: (checkpoints: CheckpointsType[]) => void;
    setWaybillModalActive: (activeWaybillModal: boolean) => void;
    setWaybillID: (wayID: number) => void;
}

export interface WaybillProps {
    currentUserRole: string;
    waybillsJSON: string;
}

export interface SiteAlertProps {
    alertData: AlertType;
    setAlertData: (alert: AlertType) => void;
}

export interface SearchProps {
    setData: any;
    Data: any;
    keyField: string;
}

export interface ConsignmentProps {
    currentUserRole: string;
    consignmentsJSON: string;
    trucksJSON: string;
    driversJSON: string,
    warehousesJSON: string;
    goodsOwnersJSON: string,
}

export interface WriteOffActsProps {
    currentUserRole: string;
    writeOffActsJSON: string;
    consignmentsJSON: string;
}

export interface WarehouseProps {
    currentUserRole: string;
    warehousesJSON: string;
    warehousemansJSON: string;
}

export interface CompanyProps {
    currentUserRole: string;
    companiesJSON: string;
}

export interface UsersProps {
    usersJSON: string;
    rolesJSON: string;
    companiesJSON: string;
}

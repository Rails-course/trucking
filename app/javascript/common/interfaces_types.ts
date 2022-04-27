import * as React from 'react';
import { Order, UserData } from '../mixins/initialValues/userList';

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

// INTERFACES
export interface CreateConsignmentFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    handleSubmit: any;
    newGoods: any;
    handleFieldAdd: any;
    handleFieldChange: any,
    formErrors: any;
    trucksJSON: [], driversJSON: [];
}

export interface WarehouseData {
    id: number;
    warehouse_name: string;
    trusted: boolean;
}

export interface WriteOffActTableProps {
    writeOffActs: any, searchData: any;
}

export interface CreateWriteOffActFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    handleSubmit: any;
    formErrors: any;
    consignmentsJSON: string;
    setAlertData:any,
}

export interface CreateWaybillsFormProps {
    id: number;
    handleClose: () => void;
    formWaybillErrors: any;
    isActiveWayBill: boolean;
    setWayBillActive: any;
    data: any, owners: any;
    setAlertData:any,
    setConsignment: any, consignments: any;
    warehouses: [];
}

export interface CreateRoutesFormProps {
    isActiveModal: boolean;
    routeHandleClose: () => void;
    setRoutes: any, routes: any,
}

export interface WarehouseTableProps {
    warehouses: WarehouseData[];
    setWarehouses: any;
    currentUserRole: any;
    setAlertData:any,
    searchData: any;
}

export interface CreateWarehouseFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    setWarehouses: any,
    formErrors: any,
    setFormErrors: any,
    setAlertData:any,
    warehousemansData: [];
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
    setUpdateModalActive: any;
    users: any;
    setUser: any;
    setEditUserModal: any;
    searchData: any;
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

export interface EnhancedTableToolbarProps {
    numSelected: number;
    users: any;
    setUser: any;
    selectedUsersIds: any;
    setSelectedUsersIds: any;
}

export interface UserCreateFormProps {
    createModal: boolean;
    updateModal: boolean;
    handleClose: () => void;
    editUserModal: any;
    title: string;
    companies: any;
    roles: any;
    handleSubmit: any;
    btnTitle: string;
    formErrors: any;
}

export interface WaybillGoodsProps {
    wayId: number;
}

export interface CheckpointWindowFormProps {
    id: number,
    status: boolean,
    currentUserRole: any;
    setAlertData:any,
    wayID: number,
    setCheckpoints: any,
}

export interface CheckpointsFormProps {
    id: number,
    isWaybillModal: boolean;
    setWaybillModalActive: any;
    checkpoints: any;
    currentUserRole: any;
    setAlertData:any,
    handleSubmitWaybill: (id: number) => void,
    formErrorsCheckpoints: any,
    setCheckpoints: any,
}

export interface ConsignmentGoodsProps {
    isActiveModal: boolean;
    handleClose: () => void;
    goods: Item[];
    checkedGoods: any, setTitleStatus: any;
    setCheckedGoods: any, handleGoodsSubmit: any;
    currentUserRole: any;
    titleStatus: string;
}

export interface ConsignmentTableProps {
    setOwners: any;
    setModalGoodsActive: any;
    setWayBillActive: any;
    setGoods: any;
    setConsID: any;
    formErrors: any;
    consignments: any, setData: any;
    currentUserRole: any, setConsWaybillId: any;
    searchData: any;
    setWarehouses: any;
}

export interface CreateCompanyFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    setCompany: any, formErrors: any;
    setFormErrors: any,
    setAlertData:any,
}

export interface CompanyTableProps {
    companies: any, setCompany: any;
    setAlertData:any, searchData: any;
    suspendCompany: any, resumeCompany: any;
}

export interface WaybillTableProps {
    waybills: any, searchData: any;
    setCheckpoints: any;
    setWaybillModalActive: any;
    setWaybillID: any;
    setWaybill: any;
}

export interface WaybillProps {
    currentUserRole: string;
    waybillsJSON: any;
}

export interface SiteAlertProps {
    alertData:any, setAlertData:any;
}

export interface SearchProps {
    setData: any;
    Data: any;
    keyField: string;
}

export interface ConsignmentProps {
    currentUserRole: string;
    consignmentsJSON: string;
    trucksJSON: [], driversJSON: [], warehouses: [];
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
    usersJSON: string;
}

export interface UsersProps {
    rolesJSON: string;
    companiesJSON: string;
    usersJSON: string;
}
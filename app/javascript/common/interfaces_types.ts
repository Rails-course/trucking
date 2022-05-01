import * as React from 'react';
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

// INTERFACES
export interface CreateConsignmentFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    handleSubmit: (consignment: consignmentFormValues) => void;
    newGoods: object[], trucksJSON: [], driversJSON: [];
    handleFieldAdd: () => void;
    handleFieldChange: (e: object, index: number) => void;
    formErrors: object;
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
    setAlertData: (d: object) => void;
}

export interface CreateWaybillsFormProps {
    id: number;
    handleClose: () => void;
    formWaybillErrors: object;
    isActiveWayBill: boolean;
    setWayBillActive: (x: boolean) => void;
    data: object[], owners: object[];
    setAlertData: (y: object) => void,
    setConsignment: (c: []) => void;
    consignments: object[];
    warehousesJSON: string;
}

export interface CreateRoutesFormProps {
    isActiveModal: boolean;
    routeHandleClose: () => void;
    setRoutes: (r: []) => void;
    routes: [];
}

export interface WarehouseTableProps {
    warehouses: WarehouseData[];
    setWarehouses: (m: []) => void;
    currentUserRole: string;
    setAlertData: (x: object) => void,
    searchData: any;
}

export interface CreateWarehouseFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    setWarehouses: (a: []) => void;
    formErrors: object,
    setFormErrors: any,
    setAlertData: (o: object) => void,
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
    userIds: number[];
    setUserId: (id: []) => void;
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
    userIds: number[],
    selectedUsersIds: any;
    setSelectedUsersIds: (a: []) => void;
}

export interface UserCreateFormProps {
    createModal: boolean, updateModal: boolean;
    handleClose: () => void;
    editUserModal: number;
    title: string, roles: object[];
    handleSubmit: (user: userFormValues) => void;
    btnTitle: string, companies: object[];
    formErrors: object;
}

export interface CheckpointWindowFormProps {
    id: number,
    status: boolean,
    currentUserRole: string;
    setAlertData: (object) => void,
    wayID: number,
    setCheckpoints: any,
}

export interface CheckpointsFormProps {
    id: number,
    isWaybillModal: boolean;
    setWaybillModalActive: (boolean) => void;
    checkpoints: object[];
    currentUserRole: string;
    setAlertData: (object) => void,
    handleSubmitWaybill: (id: number) => void,
    formErrorsCheckpoints: object,
    setCheckpoints: (c: []) => void;
}

export interface ConsignmentGoodsProps {
    isActiveModal: boolean;
    handleClose: () => void;
    goods: Item[], checkedGoods: Item[];
    setTitleStatus: (x: string) => void;
    setCheckedGoods: (c: []) => void;
    handleGoodsSubmit: () => void;
    currentUserRole: string;
    titleStatus: string;
}

export interface ConsignmentTableProps {
    setOwners: (o: []) => void;
    setModalGoodsActive: (x: boolean) => void;
    setWayBillActive: (x: boolean) => void;
    setGoods: (g: []) => void,
    setConsID: (n: number) => void, setConsWaybillId: (n: number) => void;
    formErrors: object;
    consignments: [], setData: any;
    currentUserRole: string
    searchData: any;
}

export interface CreateCompanyFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    setCompany: any, formErrors: object;
    setFormErrors: (e: []) => void;
    setAlertData: (object) => void,
}

export interface CompanyTableProps {
    companies: [], setCompany: (c: []) => void;
    setAlertData: (object) => void,
    searchData: any;
    suspendCompany: (id: number) => void, resumeCompany: (id: number) => void;
}

export interface WaybillTableProps {
    waybills: object[], searchData: any;
    setCheckpoints: (c: []) => void;
    setWaybillModalActive: (boolean) => void;
    setWaybillID: (id: number) => void;
    setWaybill: (w: []) => void;
}

export interface WaybillProps {
    currentUserRole: string;
    waybillsJSON: [];
}

export interface SiteAlertProps {
    alertData:any, setAlertData: (object) => void,
}

export interface SearchProps {
    setData:any;
    Data:any;
    keyField: string;
}

export interface ConsignmentProps {
    currentUserRole: string;
    consignmentsJSON: string;
    trucksJSON: [], driversJSON: [], warehousesJSON: string;
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

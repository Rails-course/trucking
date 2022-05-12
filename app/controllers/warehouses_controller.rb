# frozen_string_literal: true

class WarehousesController < ApplicationController
  before_action :set_warehouse, only: %i[trust_warehouse destroy]

  def index
    @warehouses = Warehouse.all
    @warehousemans = User.where(role: Role.find_by(role_name: 'warehouseman'))
  end

  def create
    @warehouse = Warehouse.new(warehouse_params)
    if @warehouse.save
      render json: @warehouse.to_json
    else
      render json: @warehouse.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @warehouse.destroy
  end

  def update
    @warehouse.toggle_trusted
    render json: @warehouse.to_json
  end

  private

  def set_warehouse
    @warehouse = Warehouse.find(params.require(:id))
  end

  def permit_warehouse_params
    params.permit(%i[warehouse_name apartment building street town warehouseman])
  end

  def warehouse_params
    warehouse_params = permit_warehouse_params
    warehouse_params[:address] = Address.new(town: permit_warehouse_params[:town],
                                             street: permit_warehouse_params[:street],
                                             building: permit_warehouse_params[:building],
                                             apartment: permit_warehouse_params[:apartment])
    find_warehouseman(warehouse_params)
    warehouse_params.except(:town, :street, :building, :apartment)
  end

  def find_warehouseman(warehouse_params)
    warehouseman_fio = warehouse_params[:warehouseman].split
    warehouse_params[:warehouseman] = User.find_by(second_name: warehouseman_fio[0],
                                                   first_name: warehouseman_fio[1],
                                                   middle_name: warehouseman_fio[2])
    warehouse_params
  end
end

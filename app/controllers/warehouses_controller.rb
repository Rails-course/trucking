# frozen_string_literal: true

class WarehousesController < ApplicationController
  def index
    @warehouses = Warehouse.all

    respond_to do |format|
      format.html
      format.json do
        render json: @warehouses.to_json
      end
    end
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
    Warehouse.find(params.require(:id)).destroy
  end

  private

  def permit_warehouse_params
    params.permit(%i[warehouse_name apartment building street town])
  end

  def warehouse_params
    warehouse_params = permit_warehouse_params
    warehouse_params[:address] = Address.new(town: permit_warehouse_params[:town],
                                             street: permit_warehouse_params[:street],
                                             building: permit_warehouse_params[:building],
                                             apartment: permit_warehouse_params[:apartment])
    warehouse_params.except(:town, :street, :building, :apartment)
  end
end

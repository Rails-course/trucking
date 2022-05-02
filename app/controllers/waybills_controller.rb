# frozen_string_literal: true

class WaybillsController < ApplicationController
  before_action :company_waybills, only: :index

  def index; end

  def create
    points = points_params
    ActiveRecord::Base.transaction do
      startpoint = Address.create!(points[:startpoint])
      endpoint = Address.create!(points[:endpoint])
      @waybill = Waybill.create!(create_waybill_params(startpoint, endpoint))
      if points[:checkpoints].present?
        points[:checkpoints].each do |city_name|
          Checkpoint.create!(city: city_name, waybill: @waybill)
        end
      end
    end
    render json: @waybill.to_json(include: [consignment: { include: %i[dispatcher driver truck
                                                                       manager waybill goods] }])
  end

  def update
    authorize! :update, Waybill
    waybill = Waybill.find(params.permit(:id)[:id])
    if waybill.update(status: 'delivered to the recipient')
      render json: waybill
    else
      render json: { status: 422, message: waybill.errors }
    end
  end

  private

  def company_waybills
    return @waybills = Waybill.all if current_user.role.role_name == 'system administrator'

    company_dispatchers = User.where(role: Role.find_by(role_name: 'dispatcher'),
                                     company: current_user.company)
    company_consignments = Consignment.where(dispatcher: company_dispatchers)
    @waybills = Waybill.where(consignment: company_consignments)
  end

  def get_waybill_consignment_goods(waybill)
    @consignment = waybill.consignment
    Good.where(bundle_seria: @consignment.bundle_seria, bundle_number: @consignment.bundle_number)
  end

  def waybill_params
    parameters = params.require(:waybill).permit(:start_date, :end_date, :town, :street, :building,
                                                 :end_town, :end_street, :end_building,
                                                 :goods_owner, :waybill_number, :waybill_seria,
                                                 :warehouse)
    parameters[:consignment] = params.permit(:consignment_id)[:consignment_id]
    parameters[:checkpoints] = params.permit(checkpoints: [])[:checkpoints]
    parameters
  end

  def points_params
    data = waybill_params
    { startpoint: { town: data[:town], street: data[:street], building: data[:building] },
      endpoint: { town: data[:end_town], street: data[:end_street],
                  building: data[:end_building] },
      checkpoints: data[:checkpoints] }
  end

  def create_waybill_params(startpoint, endpoint)
    data = waybill_params
    { start_date: waybill_params[:start_date], end_date: waybill_params[:end_date],
      startpoint: startpoint, endpoint: endpoint,
      waybill_number: waybill_params[:waybill_number],
      waybill_seria: waybill_params[:waybill_seria],
      goods_owner: GoodsOwner.find_by(goods_owner_name: data[:goods_owner]),
      consignment: Consignment.find(data[:consignment]),
      warehouse: Warehouse.find_by(warehouse_name: data[:warehouse]) }
  end
end

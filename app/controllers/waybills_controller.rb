# frozen_string_literal: true

class WaybillsController < ApplicationController
  def index
    # current_user.driver_consignments.each{|ttn| waybills.append(ttn.find_waybill)}
    @waybills = Waybill.all
  end

  def create
    data = create_waybill_params
    begin
      ActiveRecord::Base.transaction do
        data[:startpoint].save
        data[:endpoint].save
        waybill = Waybill.new(start_date: waybill_params[:start_date],
                              end_date: waybill_params[:end_date],
                              startpoint: data[:startpoint], endpoint: data[:endpoint],
                              consignment: data[:ttn], goods_owner: data[:owner])
        waybill.save
        params.permit(routes: [])[:routes].each do |city_name|
          Route.new(city: city_name, waybill: waybill).save
        end
      end
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: { status: 422, message: e } }
    end
  end

  def update
    authorize! :update, Waybill
    waybill = Waybill.find(params.permit(:ids)[:ids])
    if waybill.update(status: 'Delivered to the recipient')
      render json: waybill
    else
      render json: { status: 422, message: waybill.errors }
    end
  end

  private

  def get_waybill_consignment_goods(waybill)
    @consignment = waybill.consignment
    Good.where(bundle_seria: @consignment.bundle_seria, bundle_number: @consignment.bundle_number)
  end

  def waybill_params
    params.require(:waybill).permit(:start_date, :end_date, :town, :street, :building,
                                    :end_town, :end_street, :end_building, :goods_owner)
  end

  def create_waybill_params
    data = waybill_params
    { startpoint: Address.new(town: data[:town], street: data[:street], building: data[:building]),
      endpoint: Address.new(town: data[:end_town], street: data[:end_street],
                            building: data[:end_building]),
      owner: GoodsOwner.find_by(goods_owner_name: data[:goods_owner]),
      ttn: Consignment.find(params.permit(:ttn_id)[:ttn_id]) }
  end
end

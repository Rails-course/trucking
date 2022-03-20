# frozen_string_literal: true

class WaybillController < ApplicationController
  def create
    byebug
    waybill = Waybill.new(create_waybill)
    flash[:success] = 'waybill succesfully created' if waybill.save && checkpoints(waybill)
  end

  private

  def waybill_params
    params.require(:waybill).permit(:start_date, :end_date, :town, :street, :building,
                                    :end_town, :end_street, :end_building, :ttn_id, :goods_owner)
  end

  def create_waybill
    start_point = Address.new(town: waybill_params[:town], street: waybill_params[:street],
                              building: waybill_params[:building])
    start_point.save
    end_point = Address.new(town: waybill_params[:end_town], street: waybill_params[:end_street],
                            building: waybill_params[:end_building])
    end_point.save
    owner=GoodsOwner.find_by(warehouse_name: waybill_params[:goods_owner]).id
    waybill = { start_date: waybill_params[:start_date], end_date: waybill_params[:end_date],
                startpoint: start_point.id, endpoint: end_point.id, consignment_id: waybill_params[:ttn_id],
                goods_owner_id:owner }
  end

  def checkpoints(waybill)
    params.permit(routes: [])[:routes].each do |city_name|
      Route.new(city: city_name, waybill_id: waybill.id).save
    end
  end
end

# frozen_string_literal: true

class WaybillsController < ApplicationController
  def index
    # waybills=[]
    @data = []
    # current_user.driver_consignments.each{|ttn| waybills.append(ttn.find_waybill)}
    Waybill.all.each do |waybill|
      @data.append({ id: waybill.id,
                     startpoint: waybill.startpoint.full_address,
                     endpoint: waybill.endpoint.full_address,
                     status: waybill.status })
    end
    @data
  end

  def routes
    render json: Waybill.find(params.permit(:id)[:id]).routes
  end

  def create
    data = create_waybill
    start_point = Address.new(data[:startpoint])
    end_point = Address.new(data[:endpoint])
    begin
      ActiveRecord::Base.transaction do
        start_point.save
        end_point.save
        waybill = Waybill.new(start_date: waybill_params[:start_date], end_date: waybill_params[:end_date],
                              startpoint: start_point, endpoint: end_point,
                              consignment: Consignment.find(params.permit(:ttn_id)[:ttn_id]),
                              goods_owner: data[:owner])
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
    @waybill = Waybill.find(params.permit(:ids)[:ids])
    begin
      ActiveRecord::Base.transaction do
        @waybill.update(status: 'Delivered to the recipient')
      end
    rescue ActiveRecord::RecordInvalid => e
      @waybill = { error: { status: 422, message: e } }
    end

    render json: @waybill
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

  def create_waybill
    { startpoint: { town: waybill_params[:town], street: waybill_params[:street],
                    building: waybill_params[:building] },
      endpoint: { town: waybill_params[:end_town], street: waybill_params[:end_street],
                  building: waybill_params[:end_building] },
      owner: GoodsOwner.find_by(goods_owner_name: waybill_params[:goods_owner]) }
  end
end

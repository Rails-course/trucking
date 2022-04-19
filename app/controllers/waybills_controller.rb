# frozen_string_literal: true

class WaybillsController < ApplicationController
  def index
    @data = []
    Waybill.all.each do |waybill|
      @data.append({ id: waybill.id,
                     startpoint: waybill.startpoint.full_address,
                     endpoint: waybill.endpoint.full_address,
                     status: waybill.status,
                     seria: waybill.waybill_seria,
                     number: waybill.waybill_number
                   })
    end
    @data
  end

  def create
    data = create_waybill_params
    startpoint = Address.new(data[:startpoint])
    endpoint = Address.new(data[:endpoint])
    begin
      ActiveRecord::Base.transaction do
        startpoint.save
        endpoint.save
        waybill = Waybill.new(start_date: waybill_params[:start_date],
                              end_date: waybill_params[:end_date],
                              startpoint: startpoint, endpoint: endpoint,
                              consignment: data[:consignment], goods_owner: data[:owner],
                              waybill_number: waybill_params[:number], waybill_seria: waybill_params[:seria])
        waybill.save
        params.permit(routes: [])[:routes].each do |city_name|
          Route.new(city: city_name, waybill: waybill).save
        end
      end
    rescue ActiveRecord::RecordInvalid => e
      return render json: e, status: :unprocessable_entity
    end
    # NOTE: after creating waybill we need to disable create waybill button
    # in order to do this we need to send back updated ttn with created waybill
    # We need to refactor this in future, because sending consignment in response for
    # create Waybill is bad practice
    render json: data[:consignment].to_json(include: %i[dispatcher driver truck manager waybill
                                                        goods])
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
                                    :end_town, :end_street, :end_building, :goods_owner,
                                    :number, :seria)
  end

  def create_waybill_params
    data = waybill_params
    { startpoint: { town: data[:town], street: data[:street], building: data[:building] },
      endpoint: { town: data[:end_town], street: data[:end_street],
                  building: data[:end_building] },
      owner: GoodsOwner.find_by(goods_owner_name: data[:goods_owner]),
      consignment: Consignment.find(params.permit(:consignment_id)[:consignment_id]) }
  end
end

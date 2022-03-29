# frozen_string_literal: true

class GoodsController < ApplicationController
  before_action :set_consignment_goods, only: %i[get_consignment_goods set_goods_cheked_status]
  before_action :set_waybill_goods, only: %i[waybill_goods set_goods_delivered_status]
  def get_consignment_goods
    authorize! :read, Good
    render json: @goods.to_json
  end

  def waybill_goods
    render json: @goods.to_json
  end

  def create
    authorize! :create, Good
    begin
      Good.transaction do
        @goods = Good.create!(goods_params)
      end
    rescue ActiveRecord::RecordInvalid => e
      @goods = { error: { status: 422, message: e } }
    end

    render json: @goods
  end

  def set_goods_cheked_status
    authorize! :update, Good
    authorize! :update, Consignment
    begin
      Good.transaction do
        @goods.each { |item| item.update(status: 'checked') }
        @consignment.update(status: 'checked', manager: current_user)
      end
      response_data = { consignment: @consignment, goods: @goods }
    rescue ActiveRecord::RecordInvalid => e
      response_data = { error: { status: 422, message: e } }
    end
    render json: response_data
  end

  def set_goods_delivered_status
    authorize! :update, Good
    authorize! :update, Consignment
    begin
      Good.transaction do
        @goods.each { |item| item.update(status: 'delivered') }
        @consignment.update(status: 'delivered')
      end
    rescue ActiveRecord::RecordInvalid => e
      @goods = { error: { status: 422, message: e } }
    end
    render json: @goods.to_json
  end

  private

  def set_consignment_goods
    @consignment = Consignment.find(params[:id])
    @goods = Good.where(bundle_seria: @consignment.bundle_seria,
                        bundle_number: @consignment.bundle_number)
  end

  def set_waybill_goods
    @consignment = Waybill.find(params[:id]).consignment
    @goods = Good.where(bundle_seria: @consignment.bundle_seria,
                        bundle_number: @consignment.bundle_number,
                        status: 'checked')
  end

  def permit_goods_params
    params.permit(:bundle_seria, :bundle_number,
                  newGoods: %i[good_name quantity unit_of_measurement])
  end

  def goods_params
    goods_params = permit_goods_params[:newGoods]
    goods_params.each do |item|
      item[:bundle_seria] = permit_goods_params[:bundle_seria]
      item[:bundle_number] = permit_goods_params[:bundle_number]
    end
    goods_params
  end
end

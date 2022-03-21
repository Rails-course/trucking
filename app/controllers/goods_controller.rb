# frozen_string_literal: true

class GoodsController < ApplicationController
  before_action :set_consignment_goods, only: %i[get_consignment_goods set_goods_cheked_status]

  def get_consignment_goods
    render json: @goods.to_json
  end

  def create
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
    @goods.each { |item| item.set_checked_status }
    render json: @goods.to_json
  end

  private

  def set_consignment_goods
    @consignment = Consignment.find(params[:id])
    @goods = Good.where(bundle_seria: @consignment.bundle_seria,
                        bundle_number: @consignment.bundle_number)
  end

  def permit_goods_params
    params.permit(:bundle_seria, :bundle_number, goods: %i[good_name quantity unit_of_measurement])
  end

  def goods_params
    goods_params = permit_goods_params[:goods]
    goods_params.each do |item|
      item[:bundle_seria] = permit_goods_params[:bundle_seria]
      item[:bundle_number] = permit_goods_params[:bundle_number]
    end
    goods_params
  end
end

# frozen_string_literal: true

class GoodsController < ApplicationController
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

  private

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

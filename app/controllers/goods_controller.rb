# frozen_string_literal: true

class GoodsController < ApplicationController
  def create
    begin
      Good.transaction do
        @goods = Good.create!(goods_params)
      end
    rescue ActiveRecord::RecordInvalid => e
      @bands = { error: { status: 422, message: e } }
    end

    render json: @goods
  end

  private

  def goods_params
    params.permit(goods: %i[bundle_seria bundle_number good_name quantity
                            unit_of_measurement]).require(:goods)
  end
end

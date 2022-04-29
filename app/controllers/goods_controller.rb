# frozen_string_literal: true

class GoodsController < ApplicationController
  before_action :set_consignment, only: %i[goods_cheked_status goods_delivered_status]

  def goods_cheked_status
    authorize! :update, Good
    authorize! :update, Consignment
    @checked_goods = @consignment.goods.where(id: params[:selectedGoodsIds])
    begin
      Good.transaction do
        @checked_goods.each { |item| item.update(status: 'checked') }
        @consignment.update(status: 'checked', manager: current_user)
      end
    rescue ActiveRecord::RecordInvalid => e
      return render json: e, status: :unprocessable_entity
    end
    render json: @consignment.to_json(include: %i[dispatcher driver truck manager waybill goods])
  end

  def goods_delivered_status
    authorize! :update, Good
    authorize! :update, Consignment
    @delivered_goods = @consignment.goods.where(id: params[:selectedGoodsIds])
    begin
      Good.transaction do
        @delivered_goods.each { |item| item.update(status: 'delivered') }
        @consignment.update(status: 'delivered')
      end
    rescue ActiveRecord::RecordInvalid => e
      return render json: e, status: :unprocessable_entity
    end

    render json: @consignment.to_json(include: %i[dispatcher driver truck manager waybill goods])
  end

  private

  def set_consignment
    @consignment = Consignment.find(params[:consignment_id])
  end
end

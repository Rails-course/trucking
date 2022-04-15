# frozen_string_literal: true

class GoodsController < ApplicationController
  before_action :set_consignment, only: %i[get_consignment_goods set_goods_cheked_status]
  before_action :set_waybill_goods, only: %i[waybill_goods set_goods_delivered_status]

  # NOTE: DEPRECATED, remove method below after stability check in develop
  def get_consignment_goods
    authorize! :read, Good
    render json: @consignment.goods.to_json
  end

  def waybill_goods
    render json: @goods.to_json
  end

  def set_goods_cheked_status
    authorize! :update, Good
    authorize! :update, Consignment
    @checked_goods = @consignment.goods.where(id: params[:checkedGoodsIds])
    begin
      Good.transaction do
        @checked_goods.each { |checked_item| checked_item.update(status: 'checked') }
        @consignment.update(status: 'checked', manager: current_user)
      end
    rescue ActiveRecord::RecordInvalid => e
      return render json: e, status: :unprocessable_entity
    end
    render json: @consignment.to_json(include: %i[dispatcher driver truck manager waybill goods])
  end

  def set_goods_delivered_status
    authorize! :update, Good
    authorize! :update, Consignment
    begin
      Good.transaction do
        @consignment.goods.each { |item| item.update(status: 'delivered') }
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

  def set_waybill_goods
    @consignment = Waybill.find(params[:id]).consignment
    @goods = Good.where(bundle_seria: @consignment.bundle_seria,
                        bundle_number: @consignment.bundle_number,
                        status: 'checked')
  end

  def permit_goods_params
    params.permit(checkedGoods: [])
  end
end

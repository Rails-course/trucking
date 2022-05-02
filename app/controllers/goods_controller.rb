# frozen_string_literal: true

class GoodsController < ApplicationController
  before_action :set_consignment, only: :update

  def update
    authorize! :update, Good
    authorize! :update, Consignment

    @goods = @consignment.goods.where(id: params[:selectedGoodsIds])
    Good.transaction do
      @goods.each { |item| item.update!(status: params[:status]) }
      if params[:status] == 'checked'
        @consignment.update!(status: params[:status], manager: current_user)
      else
        @consignment.update!(status: params[:status])
      end
    end

    render json: @consignment.to_json(include: %i[dispatcher driver truck manager waybill goods])
  end

  private

  def set_consignment
    @consignment = Consignment.find(params[:consignment_id])
  end
end

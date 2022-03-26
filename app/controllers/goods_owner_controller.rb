# frozen_string_literal: true

class GoodsOwnerController < ApplicationController
  def index
    authorize! :read, GoodsOwner
    render json: GoodsOwner.all
  end
end

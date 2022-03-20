# frozen_string_literal: true

class GoodsOwnerController < ApplicationController
  def index
    render json: GoodsOwner.all
  end
end

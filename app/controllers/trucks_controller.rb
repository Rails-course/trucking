# frozen_string_literal: true

class TrucksController < ApplicationController
  def index
    @trucks = Truck.where(company: current_user.company)
    respond_to do |format|
      format.json do
        render json: @trucks.to_json
      end
    end
  end
end

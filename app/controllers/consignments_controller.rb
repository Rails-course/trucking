# frozen_string_literal: true

class ConsignmentsController < ApplicationController
  def index; end

  def create
    @consignment = Consignment.new(consignment_params)
    if @consignment.save
      flash[:success] = 'Consignment was successfully created'
    else
      flash[:error] = 'Something went wrong with creating consignment'
      render 'consignments/index'
    end
  end

  private

  def permit_consignment_params
    params.permit(:consignment_number, :consignment_seria, :truck, :driver, :bundle_number,
                  :bundle_seria, :status)
  end

  def consignment_params
    consignment_params = permit_consignment_params
    consignment_params[:driver] =
      User.find_by(company: current_user.company, first_name: consignment_params[:driver])
    consignment_params[:truck] = Truck.find_by(truck_number: consignment_params[:truck])
    consignment_params
  end
end

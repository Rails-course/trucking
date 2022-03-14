# frozen_string_literal: true

class ConsignmentsController < ApplicationController
  def index
    @consignments = Consignment.all

    respond_to do |format|
      format.html
      format.json do
        render json: @consignments.to_json(include: { dispatcher: { only: %i[first_name
                                                                             second_name middle_name] } })
      end
    end
  end

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
                  :bundle_seria)
  end

  def consignment_params
    consignment_params = permit_consignment_params
    consignment_params[:driver] =
      User.find_by(company: current_user.company, first_name: consignment_params[:driver])
    consignment_params[:truck] = Truck.find_by(truck_number: consignment_params[:truck])
    consignment_params[:dispatcher] = current_user
    consignment_params
  end
end
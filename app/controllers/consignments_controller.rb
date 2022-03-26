# frozen_string_literal: true

class ConsignmentsController < ApplicationController
  before_action :company_consignments, only: :index

  def index
    authorize! :read, Consignment
    respond_to do |format|
      format.html
      format.json do
        render json: @consignments.to_json(include: { dispatcher: { only: %i[first_name
                                                                             second_name middle_name] } })
      end
    end
  end

  def create
    @consignment = Consignment.new(create_consignment_params)
    authorize! :create, @consignment
    if @consignment.save
      render json: @consignment.to_json(include: { dispatcher: { only: %i[first_name
                                                                          second_name middle_name] } })
    else
      render json: @consignment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def waybill_data
    ttn = Consignment.find(params.permit(:ttn_id)[:ttn_id])
    @waybill_data = { driver_fio: User.find(ttn.driver_id).full_name,
                      truck_number: ttn.truck.truck_number }
    render json: @waybill_data
  end

  private

  def company_consignments
    return @consignments = Consignment.all if current_user.role.role_name == 'system administrator'

    company_dispatchers = User.where(role: Role.find_by_role_name('dispatcher'),
                                     company: current_user.company)
    @consignments = Consignment.where(dispatcher: company_dispatchers)
  end

  def permit_consignment_params
    params.permit(values: %i[bundle_seria bundle_number consignment_number consignment_seria driver
                             truck ttn_id])
  end

  def create_consignment_params
    consignment_params = permit_consignment_params[:values]
    set_driver(consignment_params)
    consignment_params[:truck] = Truck.find_by(truck_number: consignment_params[:truck])
    consignment_params[:dispatcher] = current_user
    consignment_params
  end

  def set_driver(consignment_params)
    driver_FIO = consignment_params[:driver].split
    consignment_params[:driver] =
      User.find_by(company: current_user.company, second_name: driver_FIO[0],
                   first_name: driver_FIO[1], middle_name: driver_FIO[2])
    consignment_params
  end
end

# frozen_string_literal: true

class WriteOffActsController < ApplicationController
  def index
    authorize! :read, WriteOffAct
    @consignments = Consignment.all
    @write_off_acts = WriteOffAct.all
    respond_to do |format|
      format.html
      format.json do
        render json: @write_off_acts.to_json(include: { consignment: { only: %i[bundle_seria
                                                                                bundle_number] } })
      end
    end
  end

  def create
    authorize! :create, WriteOffAct
    @write_off_act = WriteOffAct.new(create_write_off_act_params)
    if @write_off_act.save
      render json: @write_off_act.to_json(include: { consignment: { only: %i[bundle_seria
                                                                             bundle_number] } })
    else
      render json: @write_off_act.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def permit_write_off_act_params
    params.permit(:good_name, :lost_quantity, :consignment, :description)
  end

  def create_write_off_act_params
    write_off_act_params = permit_write_off_act_params
    write_off_act_params[:consignment] = find_consigment_from_params
    write_off_act_params
  end

  def find_consigment_from_params
    consignment_credentials = permit_write_off_act_params[:consignment].split
    consignment_seria = consignment_credentials[0]
    consignment_number = consignment_credentials[1]
    consignment = Consignment.find_by(consignment_seria: consignment_seria,
                                      consignment_number: consignment_number)
  end
end

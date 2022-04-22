# frozen_string_literal: true

class WriteOffActsController < ApplicationController
  def index
    authorize! :read, WriteOffAct
    @write_off_acts = WriteOffAct.all
    data=[]
    @write_off_acts.each { |act| data.append(id:act.id,consignments_id:act.consignment_id,
        good_name:act.good_name,description:act.description,lost_quantity:act.lost_quantity,
                                             consignment: {bundle_seria: act.consignment.bundle_seria,
                                                           bundle_number: act.consignment.bundle_number },
                                             consignments_name:act.consignment_name
                                             ) }
    respond_to do |format|
      format.html
      format.json do
        render json: data.to_json
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
    write_off_act_params[:consignment] = get_consigment_from_params
    write_off_act_params
  end

  def get_consigment_from_params
    consignment_credentials = permit_write_off_act_params[:consignment].split
    consignment_seria = consignment_credentials[0]
    consignment_number = consignment_credentials[1]
    consignment = Consignment.find_by(consignment_seria: consignment_seria,
                                      consignment_number: consignment_number)
  end
end

class WaybillController < ApplicationController

  def create
    if Wayblill.new(create_waybill).save
      flash[:success] = 'waybill succesfully created'
    else
      flash[:alert] = 'Something went wrong with creating new waybill'
      render 'pages/new_user'
    end
  end

  private

  def waybill_params
    params.permit(:startdate,:enddate,
                  :town, :street, :building,
                  :end_town,:end_street, :end_building)
  end
  def create_waybill
    ttn=TTN.find(params.require(:ttn_id))
    waybill={}
  end
end
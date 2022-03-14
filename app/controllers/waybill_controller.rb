class WaybillController < ApplicationController

  def create
    if Waybill.new(create_waybill).save
      flash[:success] = 'waybill succesfully created'
    else
      flash[:alert] = 'Something went wrong with creating new waybill'
      render 'pages/new_user'
    end
  end

  private

  def waybill_params
    params.permit(:start_date,:end_date,
                  :town, :street, :building,
                  :end_town,:end_street, :end_building,:routes)
  end
  def create_waybill
    waybill={start_date:waybill_params[:start_date],end_date:waybill_params[:end_date],ttn_id:1}
  end
end
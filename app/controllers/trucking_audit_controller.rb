# frozen_string_literal: true

class TruckingAuditController < ApplicationController
  def index
    @statistics = TruckingAudit.where.not(user_id: nil).alphabetical_sort
    @statistics = search_name(params[:name]) unless params[:name].blank?
    @statistics = search_action(params[:actions]) unless params[:actions].blank?
    @statistics = search_date(params[:start_date], params[:end_date]) unless params[:start_date].blank? || params[:end_date].blank?

    respond_to do |format|
      format.html
      format.json { render json: @statistics }
    end
  end
end

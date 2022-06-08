# frozen_string_literal: true

class TruckingAuditController < ApplicationController
  def index
    statistics = TruckingAudit.where.not(user_id: nil).alphabetical_sort
    statistics = statistics.search_name(params[:name]) if params[:name].present?
    statistics = statistics.search_action(params[:actions]) if params[:actions].present?
    if params[:start_date].present? && params[:end_date].present?
      statistics = statistics.search_date(params[:start_date], params[:end_date])
    end
    respond_to do |format|
      format.html
      format.json { render json: statistics }
    end
  end
end

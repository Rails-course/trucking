# frozen_string_literal: true

class ApplicationController < ActionController::Base
  rescue_from CanCan::AccessDenied, with: :access_denied
  rescue_from ActiveRecord::DeleteRestrictionError, with: :record_delete_error
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  before_action :authenticate_user!
  def page
    if params[:page] && params[:page] != 0
      ((params[:page].to_i + 1) * default_page_size) - default_page_size
    else
      0
    end
  end

  def default_page_size
    params[:per_page] ? params[:per_page].to_i : 5
  end

  private

  def record_not_found(error)
    render json: error, status: :not_found
  end

  def record_invalid(error)
    render json: error, status: :unprocessable_entity
  end

  def record_delete_error(exception)
    render json: exception.message, status: :method_not_allowed
  end

  def access_denied(exception)
    render json: exception.message, status: :method_not_allowed
  end
end

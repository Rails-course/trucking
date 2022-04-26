# frozen_string_literal: true

class ApplicationController < ActionController::Base
  rescue_from CanCan::AccessDenied, with: :access_denied
  rescue_from ActiveRecord::DeleteRestrictionError, with: :record_delete_error
  before_action :authenticate_user!

  private
  def record_delete_error(exception)
    render json: exception.message, status: :method_not_allowed
  end
  def access_denied(exception)
    render json: exception.message, status: :method_not_allowed
  end
end

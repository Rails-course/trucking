# frozen_string_literal: true

class ApplicationController < ActionController::Base
  rescue_from CanCan::AccessDenied, with: :access_denied
  before_action :authenticate_user!

  private

  def access_denied(exception)
    render json: exception.message, status: :method_not_allowed
  end
end

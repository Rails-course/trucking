# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # NOTE: might be deleted
  skip_before_action :verify_authenticity_token
  # TODO: uncomment after creating
  # before_action :authenticate_user!
end

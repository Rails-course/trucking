# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  if Rails.env="test"
    skip_before_action :verify_authenticity_token
  end
end

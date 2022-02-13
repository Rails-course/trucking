# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  self.allow_forgery_protection = false unless ENV['RAILS_ENV'] == 'production'
end

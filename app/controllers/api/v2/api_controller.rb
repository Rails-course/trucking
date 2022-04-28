# frozen_string_literal: true

module Api
  module V2
    # rubocop: disable Rails/ApplicationController
    class ApiController < ActionController::Base
      # rubocop: enable Rails/ApplicationController
      before_action :check_basic_auth
      skip_before_action :verify_authenticity_token

      private

      def check_basic_auth
        head :unauthorized if request.authorization.blank?
        authenticate_with_http_basic do |email, password|
          user = User.find_by(email: email.downcase)
          if user&.valid_password?(password) && user&.warehouse
            @current_user = user
          else
            head :unauthorized
          end
        end
      end

      attr_reader :current_user
    end
  end
end

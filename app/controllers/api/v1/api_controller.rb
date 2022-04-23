# frozen_string_literal: true

module Api
  module V1
    class ApiController < ActionController::Base
      before_action :check_basic_auth
      before_action :deprecate_api
      skip_before_action :verify_authenticity_token

      def deprecate_api
        response.set_header('Deprecated', 'true')
        response.set_header('Sunset', '2022-04-24')
        response.set_header('New API link', '<https://trucking-logistics.herokuapp.com/api/v2/consignments>')
      end

      private

      def check_basic_auth
        if request.authorization.blank?
          head :unauthorized
          return
        end
        authenticate_with_http_basic do |email, password|
          user = User.find_by(email: email.downcase)
          if user&.valid_password?(password)
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

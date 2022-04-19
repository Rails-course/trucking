module Api
  module V1
    class ApiController < ActionController::Base
      before_action :check_basic_auth
      before_action :deprecate_api
      skip_before_action :verify_authenticity_token

      def deprecate_api
        response.set_header('Deprecated', 'true')
        response.set_header('Sunset', '2022-04-24')
        response.set_header('New API link', '<https://trucking-logistics.herokuapp.com/api/v2/waybills>')
      end

      private

      def check_basic_auth
        unless request.authorization.present?
          head :unauthorized
          return
        end
        authenticate_with_http_basic do |email, password|
          user = User.find_by(email: email.downcase)
          if user && user.valid_password?(password)
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

# frozen_string_literal: true

module Api
  module V1
    class DriversController < ApiController
      def index
        authorize! :read, User
        excluded_columns = %w[created_at updated_at role_id address_id]
        drivers_api_columns = User.attribute_names - excluded_columns
        drivers = paginate_collection(User.select(drivers_api_columns).where(role: Role.find_by(role_name: 'driver')))[:collection]
        render json: { drivers: drivers.to_json(include: [company: { only: :name }]),
                       drivers_count: User.select(drivers_api_columns).where(role: Role.find_by(role_name: 'driver')).length }
      end
    end
  end
end

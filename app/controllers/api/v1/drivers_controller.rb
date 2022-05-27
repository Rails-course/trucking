# frozen_string_literal: true

module Api
  module V1
    class DriversController < ApiController
      def index
        authorize! :read, User
        page = params.fetch(:page, 0).to_i * default_page_size.to_i
        excluded_columns = %w[created_at updated_at role_id address_id]
        drivers_api_columns = User.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        drivers = User.select(drivers_api_columns).where(role: Role.find_by(role_name: 'driver')).offset(page).limit(default_page_size)
        render json: { drivers: drivers.to_json(include: [company: { only: :name }]),
                       drivers_count: User.select(drivers_api_columns).where(role: Role.find_by(role_name: 'driver')).length }
      end
    end
  end
end

# frozen_string_literal: true

module Api
  module V1
    class DriversController < ApiController
      @@drivers_per_page = 5
      def index
        authorize! :read, User
        excluded_columns = %w[created_at updated_at role_id address_id]
        drivers_api_columns = User.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        drivers=User.select(drivers_api_columns).where(role: Role.find_by(role_name: 'driver')).limit(@@drivers_per_page)
        render json: {drivers: drivers.to_json( include: [company: { only: :name }]),
                      drivers_count: User.select(drivers_api_columns).where(role: Role.find_by(role_name: 'driver')).length}
      end

      def page
        authorize! :read, User
        page = params.fetch(:page, 0).to_i * @@drivers_per_page.to_i
        @@drivers_per_page = params[:perPage].to_i if params[:perPage]
        excluded_columns = %w[created_at updated_at role_id address_id email login]
        drivers_api_columns = User.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        render json: User.select(drivers_api_columns)
                         .where(role: Role.find_by(role_name: 'driver')).offset(page).limit(@@drivers_per_page), include: [company: { only: :name }]
      end
    end
  end
end

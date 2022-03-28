module Api
  module V1
    class DriversController < ApiController
      def index
        authorize! :read, User
        excluded_columns = %w[id created_at updated_at role_id address_id email login]
        drivers_api_columns = User.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        render json: User.where(role: Role.find_by_role_name('driver')).select(drivers_api_columns), include: [
          company: { only: :name }
        ]
      end
    end
  end
end

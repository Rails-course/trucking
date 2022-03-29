module Api
  module V1
    class TrucksController < ApiController
      def index
        authorize! :read, Truck
        excluded_columns = %w[created_at updated_at]
        trucks_api_columns = Truck.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        render json: Truck.select(trucks_api_columns), include: [
          company: { only: :name },
          truck_type: { only: :truck_type_name }
        ]
      end
    end
  end
end

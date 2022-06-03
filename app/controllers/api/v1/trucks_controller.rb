# frozen_string_literal: true

module Api
  module V1
    class TrucksController < ApiController
      def index
        authorize! :read, Truck
        excluded_columns = %w[created_at updated_at]
        trucks_api_columns = Truck.attribute_names - excluded_columns
        trucks = paginate_collection(Truck.select(trucks_api_columns))
        render json: { trucks: trucks[0].to_json(include: [
                                                   company: { only: :name },
                                                   truck_type: { only: :truck_type_name }
                                                 ]), trucks_count: trucks[1][:total_count] }
      end
    end
  end
end

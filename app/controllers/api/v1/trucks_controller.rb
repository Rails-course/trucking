# frozen_string_literal: true

module Api
  module V1
    class TrucksController < ApiController
      def index
        authorize! :read, Truck
        page = params.fetch(:page, 0).to_i * default_page_size.to_i
        excluded_columns = %w[created_at updated_at]
        trucks_api_columns = Truck.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        render json: { trucks: Truck.select(trucks_api_columns).offset(page).limit(default_page_size).to_json(include: [
                                                                                                                company: { only: :name },
                                                                                                                truck_type: { only: :truck_type_name }
                                                                                                              ]), trucks_count: Truck.select(trucks_api_columns).length }
      end
    end
  end
end

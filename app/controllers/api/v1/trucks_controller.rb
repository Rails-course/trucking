# frozen_string_literal: true

module Api
  module V1
    class TrucksController < ApiController
      @@trucks_per_page = 5
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

      def page
        authorize! :read, Truck
        page = params.fetch(:page, 0).to_i * @@trucks_per_page.to_i
        @@trucks_per_page = params[:perPage].to_i if params[:perPage]
        excluded_columns = %w[created_at updated_at]
        trucks_api_columns = Truck.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        render json: Truck.select(trucks_api_columns).offset(page).limit(@@trucks_per_page), include: [
          company: { only: :name },
          truck_type: { only: :truck_type_name }
        ]
      end
    end
  end
end

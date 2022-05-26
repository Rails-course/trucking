# frozen_string_literal: true

module Api
  module V1
    class ConsignmentsController < ApiController
      @@cons_per_page = 5

      def index
        authorize! :read, Consignment
        excluded_columns = %w[created_at updated_at]
        consignment_api_columns = Consignment.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        render json: { consignments: Consignment.select(consignment_api_columns).limit(@@cons_per_page).to_json(
          include: included_params
        ), consignments_count: Consignment.select(consignment_api_columns).length }
      end

      def show
        authorize! :read, Consignment
        render json: Consignment.find(params[:id]), include: included_params
      end

      def page
        authorize! :read, Consignment
        page = params.fetch(:page, 0).to_i * @@cons_per_page.to_i
        @@cons_per_page = params[:perPage].to_i if params[:perPage]
        excluded_columns = %w[created_at updated_at]
        consignment_api_columns = Consignment.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        render json: Consignment.select(consignment_api_columns).offset(page).limit(@@cons_per_page).to_json(
          include: included_params
        )
      end

      private

      def included_params
        [
          truck: { only: %i[truck_number],
                   include: [truck_type: { only: :truck_type_name }] },
          driver: { except: %i[id created_at updated_at role_id email login address_id],
                    include: [role: { only: :role_name }, company: { only: :name }] }
        ]
      end
    end
  end
end

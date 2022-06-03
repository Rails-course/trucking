# frozen_string_literal: true

module Api
  module V1
    class ConsignmentsController < ApiController
      def index
        authorize! :read, Consignment
        excluded_columns = %w[created_at updated_at]
        consignment_api_columns = Consignment.attribute_names - excluded_columns
        consignments_data = paginate_collection(Consignment.select(consignment_api_columns))
        render json: { consignments: consignments_data[0].to_json(include: included_params),
                       consignments_count: consignments_data[1][:total_count] }
      end

      def show
        authorize! :read, Consignment
        render json: Consignment.find(params[:id]).to_json(include: included_params)
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

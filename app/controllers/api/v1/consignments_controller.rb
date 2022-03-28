module Api
  module V1
    class ConsignmentsController < ApiController
      def index
        authorize! :read, Consignment
        excluded_columns = %w[created_at updated_at]
        consignment_api_columns = Consignment.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        render json: Consignment.select(consignment_api_columns), include: [
          truck: { only: %i[truck_number],
                   include: [truck_type: { only: :truck_type_name }] },
          driver: { except: %i[id created_at updated_at role_id email login company_id address_id],
                    include: [role: { only: :role_name }] }
        ]
      end
    end
  end
end

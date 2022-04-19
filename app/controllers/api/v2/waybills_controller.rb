module Api
  module V2
    class WaybillsController < ApiController
      def index
        authorize! :read, Waybill
        excluded_columns = %w[created_at updated_at startpoint_id endpoint_id warehouse_id]
        waybill_api_columns = Waybill.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        if current_user.warehouse.trusted
          render json: Waybill.where(warehouse: current_user.warehouse).select(waybill_api_columns),
                 include: included_params
        else
          render json: 'Access denied', status: :forbidden
        end
      end

      def show
        authorize! :read, Waybill
        render json: Waybill.find(params[:id]), include: included_params
      end

      private

      def included_params
        [
          consignment: { except: %i[created_at updated_at dispatcher_id manager_id],
                         include: [driver: { except: %i[id created_at updated_at role_id login address_id],
                                             include: [role: { only: :role_name }, company: { only: :name }] },
                                   truck: { only: %i[truck_number],
                                            include: [truck_type: { only: :truck_type_name }] },
                                   goods: { except: %i[id created_at updated_at
                                                       consignment_id] },
                                   write_off_act: { except: %i[id created_at updated_at] }] },
          goods_owner: { except: %i[id created_at updated_at address_id] }
        ]
      end
    end
  end
end

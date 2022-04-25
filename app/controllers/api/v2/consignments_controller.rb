# frozen_string_literal: true

module Api
  module V2
    class ConsignmentsController < ApiController
      before_action :warehouse_consignments, only: %i[index show]

      def index
        authorize! :read, Consignment
        if current_user.warehouse.trusted
          render json: @consignments.to_json(except: %i[created_at updated_at dispatcher_id
                                                        manager_id],
                                             include: consignment_included_params)
        else
          render json: 'Access denied', status: :forbidden
        end
      end

      def show
        authorize! :read, Consignment
        if current_user.warehouse.trusted
          render json: @consignments.find(params[:id]).to_json(except: %i[created_at updated_at
                                                                          dispatcher_id
                                                                          manager_id],
                                                               include: consignment_included_params)
        else
          render json: 'Access denied', status: :forbidden
        end
      rescue ActiveRecord::RecordNotFound
        render json: "Couldn't find Consignment with 'id'=#{params[:id]}", status: :not_found
      end

      private

      def warehouse_consignments
        @consignments = Consignment.where(waybill: current_user.warehouse.waybills)
      end

      def consignment_included_params
        [
          truck: { only: %i[truck_number],
                   include: [truck_type: { only: :truck_type_name }] },
          driver: { except: %i[id created_at updated_at role_id email login address_id],
                    include: [company: { only: :name }] },
          goods: { except: %i[created_at updated_at consignment_id] }
        ]
      end
    end
  end
end

module Api
  module V1
    class ConsignmentsController < ApiController
      before_action :company_consignments, only: :index
      def index
        authorize! :read, Consignment
        respond_to do |format|
          format.html
          format.json do
            render json: @consignments.to_json(include: { dispatcher: { only: %i[first_name
                                                                                 second_name middle_name] } })
          end
        end
      end

      private

      def company_consignments
        if ['system administrator', 'warehouseman'].include?(current_user.role.role_name)
          return @consignments = Consignment.all
        end

        company_dispatchers = User.where(role: Role.find_by_role_name('dispatcher'),
                                         company: current_user.company)
        @consignments = Consignment.where(dispatcher: company_dispatchers)
      end
    end
  end
end

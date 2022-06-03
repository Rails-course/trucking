# frozen_string_literal: true

class CompaniesController < ApplicationController
  load_and_authorize_resource

  def index
    companies = if current_user.company
                  @companies_count = total_count(Company.accessible_by(current_ability))
                  paginate_collection(Company.accessible_by(current_ability))[0]
                else
                  @companies_count = total_count(Company.all)
                  paginate_collection(Company.all)[0]
                end
    @serialized_companies = ActiveModelSerializers::SerializableResource.new(companies).to_json
    render json: companies[0] if params[:page]
  end

  def update
    @company = Company.find(params.require(:id))
    @company.change_status
    render json: @company
    # company_users = User.where(company: company)
    # TODO: ideally we need to log out all company logged in users
    # but devise doesnt provide such feature
    # company_users.each do |user|
    #   sign_out user
    # end
  end

  def create
    authorize! :create, Company
    @company = Company.create!(company_params)
    render json: @company
  end

  def destroy
    Company.find(params.require(:id)).destroy
  end

  private

  def company_params
    params.permit(:name)
  end
end

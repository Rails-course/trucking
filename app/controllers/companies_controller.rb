# frozen_string_literal: true

class CompaniesController < ApplicationController
  load_and_authorize_resource
  @@companies_per_page = 10

  def index
    companies = current_user.company ? Company.accessible_by(current_ability).limit(@@companies_per_page) : Company.all.limit(@@companies_per_page)
    @companies_count = current_user.company ? Company.accessible_by(current_ability).count : Company.all.count
    @serialized_companies = ActiveModelSerializers::SerializableResource.new(companies).to_json
  end

  def page
    page = params.fetch(:page, 0).to_i * @@companies_per_page.to_i
    @@companies_per_page = params[:perPage].to_i if params[:perPage]
    companies = if current_user.company
                  Company.accessible_by(current_ability).offset(page).limit(@@companies_per_page)
                else
                  Company.all.offset(page).limit(@@companies_per_page)
                end
    render json: ActiveModelSerializers::SerializableResource.new(companies).to_json
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

  def change_pagination_params
    @@companies_per_page = params[:page]
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

# frozen_string_literal: true

class CompaniesController < ApplicationController
  load_and_authorize_resource

  def index
    @companies = if current_user.company
                   Company.accessible_by(current_ability)
                 else
                   Company.all
                 end
    respond_to do |format|
      format.html
      format.json do
        render json: @companies.to_json
      end
    end
  end

  def suspend
    @company = Company.find(params.require(:id))
    @company.change_status
    render json: @company.to_json
    # company_users = User.where(company: company)
    # TODO: ideally we need to log out all company logged in users
    # but devise doesnt provide such feature
    # company_users.each do |user|
    #   sign_out user
    # end
  end

  def resume
    @company = Company.find(params.require(:id))
    @company.change_status
    render json: @company.to_json
  end

  def new_company; end

  def create_company
    authorize! :create, Company
    @company = Company.new(company_params)
    if @company.save
      render json: @company.to_json
    else
      render json: @company.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    Company.find(params.require(:id)).destroy
  end

  private

  def company_params
    params.permit(:name)
  end
end

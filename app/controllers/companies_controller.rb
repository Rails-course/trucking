# frozen_string_literal: true

class CompaniesController < ApplicationController
  load_and_authorize_resource

  def index
    @companies = if current_user.company
                   Company.accessible_by(current_ability)
                 else
                   Company.all
                 end
  end

  def suspend
    Company.find(params.require(:id)).change_status
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

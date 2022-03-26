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
    company = Company.new(company_params)
    if company.save
      redirect_to root_path
    else
      flash[:alert] = 'Something went wrong during creating new company'
      redirect_to ''
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

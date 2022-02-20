# frozen_string_literal: true

class CompaniesController < ApplicationController
  def index
    @companies = Company.all
  end
  def suspend
    company = Company.find(params.require(:id))
    company.update(status: !company.status)
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

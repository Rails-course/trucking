class CompaniesController < ApplicationController
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

  private

  def company_params
    params.permit(:name)
  end
end

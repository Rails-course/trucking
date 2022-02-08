class CompaniesController < ApplicationController
  def index
  @company_data=Company.all
  end
  def delete
    company=Company.find(params.require(:id))
    company.destroy
  end
end

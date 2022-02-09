class CompaniesController < ApplicationController
  def index
  @companys=Company.all
  end
  def delete
    company=Company.find(params.require(:id))
    company.destroy
  end
end

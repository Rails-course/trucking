class CompaniesController < ApplicationController
  def index
  @companys=Company.all
  end
  def destroy
    company=Company.find(params.require(:id))
    company.destroy
  end
end

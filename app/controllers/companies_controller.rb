# frozen_string_literal: true

class CompaniesController < ApplicationController
  def index
    @companies = Company.all
  end
  def status
    company=Company.find(params.require(:id))
    company.update_attributes(status:!(company.status))
  end
  def destroy
    Company.find(params.require(:id)).destroy
  end
end

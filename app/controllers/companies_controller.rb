# frozen_string_literal: true

class CompaniesController < ApplicationController
  def index
    @companies = Company.all
  end

  def suspend
     Company.find(params.require(:id)).change_status
  end

  def destroy
    Company.find(params.require(:id)).destroy
  end
end

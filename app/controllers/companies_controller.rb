# frozen_string_literal: true

class CompaniesController < ApplicationController
  def index
    @companies = Company.all
  end

  def destroy
    Company.find(params.require(:id)).destroy
  end
end

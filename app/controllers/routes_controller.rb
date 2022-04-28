# frozen_string_literal: true

class RoutesController < ApplicationController
  def pass_checkpoint
    route = Route.find(routes_params[:ids])
    route.update(is_passed: true, pass_date: routes_params[:pass_date])
    render json: route
  end

  def rollback
    route = Route.find(routes_params[:ids])
    route.update(is_passed: false, pass_date: nil)
    render json: route
  end

  private

  def routes_params
    params.permit %i[pass_date ids]
  end
end

class RouteController < ApplicationController
  def create

  end
  private
  def route_params
    params.permit(:checkpoints)
  end
end

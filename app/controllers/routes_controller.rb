class RoutesController < ApplicationController
  def pass_checkpoint
    Route.find(routes_params[:ids]).update(is_passed:true,pass_date:routes_params[:pass_date])
  end
  def rollback
    Route.find(routes_params[:ids]).update(is_passed:false,pass_date:nil)
  end
  private
  def routes_params
    params.permit [:pass_date,:ids]
  end
end


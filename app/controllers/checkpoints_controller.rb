# frozen_string_literal: true

class CheckpointsController < ApplicationController
  def update
    @checkpoint = Checkpoint.find(checkpoints_params[:id])
    @checkpoint.update(is_passed: checkpoints_params[:is_passed],
                       pass_date: checkpoints_params[:pass_date])
    render json: @checkpoint.to_json
  end

  private

  def checkpoints_params
    params.permit %i[id pass_date is_passed]
  end
end

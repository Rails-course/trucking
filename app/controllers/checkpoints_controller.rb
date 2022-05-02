# frozen_string_literal: true

class CheckpointsController < ApplicationController
  def pass_checkpoint
    checkpoint = Checkpoint.find(checkpoints_params[:ids])
    checkpoint.update!(is_passed: checkpoints_params[:is_passed],
                      pass_date: checkpoints_params[:pass_date])
    render json: checkpoint
  end

  private

  def checkpoints_params
    params.permit %i[pass_date ids is_passed]
  end
end

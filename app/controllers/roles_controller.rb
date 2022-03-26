# frozen_string_literal: true

class RolesController < ApplicationController
  def index
    @roles = Role.where.not(role_name: 'system administrator')
    render json: @roles.to_json
  end
end

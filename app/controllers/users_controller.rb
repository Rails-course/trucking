# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users_data=User.all
  end
end

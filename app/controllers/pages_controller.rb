# frozen_string_literal: true

class PagesController < ApplicationController
  def home; end

  def new_user; end

  def create_user
    @user = User.new(user_params)
    if @user.save
      redirect_to root_path
    else
      flash[:alert] = 'Something went wrong during creating new user'
      redirect_to ''
    end
  end

  private

  def user_params
    # TODO: Rename params on front side
    params.require(:user).permit(:values, :firstName, :lastName, :middleName, :email, :password,
                                 :repeatPassword, :flat, :house, :street, :city, :role)
  end
end

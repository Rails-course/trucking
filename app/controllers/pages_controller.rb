# frozen_string_literal: true

class PagesController < ApplicationController
  def home; end

  def new_user; end

  def create_user
    @user = User.new(create_user_params)
    respond_to do |format|
      if @user.save
        format.html { redirect_to 'users/new', success: 'User successfully created' }
        format.json { render json: @user, status: :created }
      else
        format.html { redirect_to 'users/new', alert: 'Something went wrong while creating user' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :second_name, :middle_name, :birthday,
                                 :login, :email, :password, :password_confirmation,
                                 :role, :town, :street, :building, :apartment)
  end

  def create_user_params
    create_user_params = user_params
    create_user_params[:role] = Role.find_by(role_name: user_params[:role])
    create_user_params[:address] = Address.new(town: user_params[:town],
                                               street: user_params[:street],
                                               building: user_params[:building],
                                               apartment: user_params[:apartment])
    create_user_params.except(:town, :street, :building, :apartment)
  end
end

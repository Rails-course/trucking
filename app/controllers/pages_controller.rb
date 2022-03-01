# frozen_string_literal: true

class PagesController < ApplicationController
  def home; end

  def new_user; end

  def create_user
    @user = User.new(create_user_params)
    if @user.save
      flash[:success] = 'User succesfully created'
    else
      flash[:alert] = 'Something went wrong with creating new user'
      render 'pages/new_user'
    end
  end

  def get_drivers
    @users = User.where(company: current_user.company, role: Role.find_by(role_name: 'driver'))
    respond_to do |format|
      format.json do
        render json: @users.to_json
        # render json: @users.to_json(include: { role: { only: [:role_name] } })
      end
    end
  end

  private

  def user_params
    params.permit(:first_name, :second_name, :middle_name, :birthday,
                  :passport, :login, :email, :password, :password_confirmation,
                  :role, :town, :street, :building, :apartment, :company)
  end

  def create_user_params
    create_user_params = user_params
    create_user_params[:role] = Role.find_by(role_name: user_params[:role])
    create_user_params[:address] = Address.new(town: user_params[:town],
                                               street: user_params[:street],
                                               building: user_params[:building],
                                               apartment: user_params[:apartment])
    create_user_params[:company] = Company.find_by(name: user_params[:company])
    create_user_params.except(:town, :street, :building, :apartment)
  end
end

# frozen_string_literal: true

class PagesController < ApplicationController
  before_action :set_user, only: %i[user_data update_user]
  def home; end

  def users_index
    data=[]
    @users = if current_user.company
               User.where(company: current_user.company)
             else
               User.all
             end
    @users.each{|user| data.append(name:user.full_name,role:user.role,login:user.login,id:user.id)}
    respond_to do |format|
      format.html
      format.json do
        render json: data.to_json
      end
    end
  end

  def user_data
    render json: @user.to_json(include:
      { role: { only: [:role_name] },
        company: { only: [:name] },
        address: { only: %i[town street building apartment] } })
  end

  def update_user
    if @user.update(user_params)
      flash[:success] = 'User successfully updated'
    else
      flash[:alert] = 'Something went wrong with updating user'
      render 'pages/users_index'
    end
  end

  def create_user
    @user = User.new(user_params)
    if @user.save
      flash[:success] = 'User successfully created'
    else
      flash[:alert] = 'Something went wrong with creating new user'
      render 'pages/users_index'
    end
  end

  def get_drivers
    @users = User.where(company: current_user.company, role: Role.find_by(role_name: 'driver'))
    respond_to do |format|
      format.json do
        render json: @users.to_json
      end
    end
  end

  def get_warehousemans
    @users = User.where(role: Role.find_by(role_name: 'warehouseman'))
    respond_to do |format|
      format.json do
        render json: @users.to_json
      end
    end
  end

  def destroy_user
    User.find(params.require(:id)).destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def permit_user_params
    params.permit(:first_name, :second_name, :middle_name, :birthday,
                  :passport, :login, :email, :password, :password_confirmation,
                  :role, :town, :street, :building, :apartment, :company)
  end

  def user_params
    user_params = permit_user_params
    user_params[:role] = Role.find_by(role_name: permit_user_params[:role])
    user_params[:address] = Address.new(town: permit_user_params[:town],
                                        street: permit_user_params[:street],
                                        building: permit_user_params[:building],
                                        apartment: permit_user_params[:apartment])
    user_params[:company] = Company.find_by(name: permit_user_params[:company])
    user_params.except(:town, :street, :building, :apartment)
  end
end

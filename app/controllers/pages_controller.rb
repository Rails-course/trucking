# frozen_string_literal: true

class PagesController < ApplicationController
  before_action :set_user, only: %i[user_data update_user]

  def home; end

  def users_index
    roles = Role.where.not(role_name: 'system administrator')
    companies = current_user.company ? Company.where(name: current_user.company.name) : Company.all
    users_data =  if current_user.company
                   paginate_collection(User.where(company: current_user.company))
                  else
                   paginate_collection(User.all)
                  end
    @user_count = users_data[1][:total_count]
    @serialized_roles = ActiveModelSerializers::SerializableResource.new(roles).to_json
    @serialized_companies = ActiveModelSerializers::SerializableResource.new(companies).to_json
    @serialized_users = ActiveModelSerializers::SerializableResource.new(users_data[0]).to_json
    render json: users_data[0] if params[:page]
  end

  def user_data
    render json: @user
  end

  def update_user
    if @user.update(user_params)
      render json: @user.to_json(include: %i[role address])
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def create_user
    authorize! :create, User
    @user = User.new(user_params)
    if @user.save
      render json: @user.to_json(include: %i[role address])
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
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

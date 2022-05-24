# frozen_string_literal: true

class ConsignmentsController < ApplicationController
  @@consignment_per_page = 5

  def index
    authorize! :read, Consignment

    consignments_resources
    company_consignments
    @consignment_count = consignment_count
    @serialized_warehouses = ActiveModelSerializers::SerializableResource.new(@warehouses).to_json
    @serialized_trucks = ActiveModelSerializers::SerializableResource.new(@trucks).to_json
    @serialized_drivers = ActiveModelSerializers::SerializableResource.new(@drivers).to_json
    @serialized_goods_owners = ActiveModelSerializers::SerializableResource.new(@goods_owners).to_json
    @serialized_consignments = ActiveModelSerializers::SerializableResource.new(@consignments).to_json
  end

  def page
    page = params.fetch(:page, 0).to_i * @@consignment_per_page.to_i
    @@consignment_per_page = params[:perPage].to_i if params[:perPage]
    if current_user.role.role_name == 'system administrator'
      @consignments = Consignment.all.offset(page).limit(@@consignment_per_page.to_i)
    else
      company_dispatchers = User.where(role: Role.find_by(role_name: 'dispatcher'),
                                       company: current_user.company)
      @consignments = Consignment.where(dispatcher: company_dispatchers)
                                 .order({ created_at: :desc }).offset(page).limit(@@consignment_per_page.to_i)
    end
    serialized_consignments = ActiveModelSerializers::SerializableResource.new(@consignments).to_json
    render json: serialized_consignments
  end

  def create
    authorize! :create, Consignment
    authorize! :create, Good

    ActiveRecord::Base.transaction do
      @consignment = Consignment.create!(create_consignment_params)
      @goods = Good.create!(create_goods_params(@consignment))
    end
  end

  private

  def consignments_resources
    @warehouses = Warehouse.all
    @trucks = Truck.where(company: current_user.company)
    @drivers = User.where(company: current_user.company, role: Role.find_by(role_name: 'driver'))
    @goods_owners = GoodsOwner.all
  end

  def company_consignments
    if current_user.role.role_name == 'system administrator'
      return @consignments = Consignment.all.limit(@@consignment_per_page)
    end

    company_dispatchers = User.where(role: Role.find_by(role_name: 'dispatcher'),
                                     company: current_user.company)
    @consignments = Consignment.where(dispatcher: company_dispatchers).order({ created_at: :desc }).limit(@@consignment_per_page)
  end

  def consignment_count
    return Consignment.all.count if current_user.role.role_name == 'system administrator'

    company_dispatchers = User.where(role: Role.find_by(role_name: 'dispatcher'),
                                     company: current_user.company)
    Consignment.where(dispatcher: company_dispatchers).order({ created_at: :desc }).count
  end

  def permit_consignment_params
    params.permit(consignment: %i[bundle_seria
                                  bundle_number
                                  consignment_number
                                  consignment_seria
                                  driver
                                  truck ttn_id],
                  newGoods: %i[good_name
                               quantity
                               unit_of_measurement])
  end

  def create_consignment_params
    consignment_params = permit_consignment_params[:consignment]
    find_driver(consignment_params)
    find_truck(consignment_params)
    consignment_params[:dispatcher] = current_user
    consignment_params
  end

  def create_goods_params(consignment)
    goods_params = permit_consignment_params[:newGoods]
    goods_params.each do |item|
      item[:consignment] = consignment
    end
    goods_params
  end

  def find_driver(consignment_params)
    driver_fio = consignment_params[:driver].split
    consignment_params[:driver] =
      User.find_by(company: current_user.company, second_name: driver_fio[0],
                   first_name: driver_fio[1], middle_name: driver_fio[2])
    consignment_params
  end

  def find_truck(consignment_params)
    consignment_params[:truck] = Truck.find_by(truck_number: consignment_params[:truck])
    consignment_params
  end
end

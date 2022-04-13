# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  get '/users', to: 'pages#users_index'
  scope '/users' do
    post '/create', to: 'pages#create_user'
    get '/drivers', to: 'pages#get_drivers'
    get '/warehousemans', to: 'pages#get_warehousemans'
    delete '/:id', to: 'pages#destroy_user'
    get '/:id', to: 'pages#user_data'
    patch 'edit/:id', to: 'pages#update_user'
  end
  root 'pages#home'
  resources :companies
  scope '/companies' do
    post '/create', to: 'companies#create_company'
    patch '/suspend/:id', to: 'companies#suspend'
  end
  resources :goods
  resources :consignments
  scope '/consignments' do
    get '/:id/goods', to: 'goods#get_consignment_goods'
    get '/:id/waybill_goods', to: 'goods#waybill_goods'
    patch '/:id/goods', to: 'goods#set_goods_cheked_status'
    patch '/:id/waybill_goods', to: 'goods#set_goods_delivered_status'
  end
  resources :write_off_acts, only: %i[index create]
  resources :trucks
  get '/consignment/waybill_data/:consignment_id', to: 'consignments#waybill_data'
  resources :waybills
  patch '/waybills/endTrucking', to: 'waybill#end_trucking'
  resources :roles, only: :index
  resources :warehouses
  patch '/warehouses/trust/:id', to: 'warehouses#trust_warehouse'
  get '/goodsowners', to: 'goods_owner#index'
  scope '/routes' do
    patch '/rollback', to: 'routes#rollback'
    patch '/passCheckpoint', to: 'routes#pass_checkpoint'
  end
  get '/routes/:id', to: 'routes#routes'
  namespace :api do
    namespace :v1 do
      resources :consignments, only: %i[index show] do
        resources :consignment_goods, only: :index
      end
      resources :drivers, only: [:index]
      resources :trucks, only: [:index]
    end
  end
end

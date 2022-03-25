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
  resources :goods
  resources :trucks
  resources :roles, only: :index
  resources :warehouses
  patch '/warehouses/trust/:id', to: 'warehouses#trust_warehouse'
  get '/goodsowners', to: 'goods_owner#index'
  resources :companies
  scope '/companies' do
    post '/create', to: 'companies#create_company'
    patch '/suspend/:id', to: 'companies#suspend'
  end
  resources :consignments
  get '/consignment/waybill_data/:ttn_id', to: 'consignments#waybill_data'
  scope '/waybill' do
    post '/create', to: 'waybill#create'
  end
  resources :waybills
  patch '/waybills/endTrucking', to: 'waybills#end_trucking'
  scope '/routes' do
    patch '/rollback', to: 'routes#rollback'
    patch '/passCheckpoint', to: 'routes#pass_checkpoint'
  end
  get '/routes/:id', to: 'waybills#routes'
  get '/consignment/waybill_data/:ttn_id', to: 'consignments#waybill_data'
  get '/goodsowners', to: 'goods_owner#index'
end

# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  get '/users', to: 'pages#users_index'
  scope '/users' do
    get '/drivers', to: 'pages#drivers'
    get '/warehousemans', to: 'pages#warehousemans'
    post '/create', to: 'pages#create_user'
    get '/:id', to: 'pages#user_data'
    patch '/:id/edit', to: 'pages#update_user'
    delete '/:id', to: 'pages#destroy_user'
  end
  root 'pages#home'
  resources :companies
  scope '/companies' do
    post '/create', to: 'companies#create_company'
    patch '/:id/suspend', to: 'companies#suspend'
    patch '/:id/resume', to: 'companies#resume'
  end
  resources :goods
  resources :consignments
  # resources :consignments, only: %i[index create waybill_data] do
  #   resources :goods, only: %i[index create update]
  # end
  # TODO: change implementation of scope below with a way above
  scope '/consignments' do
    get '/:consignment_id/goods', to: 'goods#get_consignment_goods'
    get '/:id/waybill_goods', to: 'goods#waybill_goods'
    patch '/:consignment_id/goods', to: 'goods#set_goods_cheked_status'
    patch '/:id/waybill_goods', to: 'goods#set_goods_delivered_status'
  end
  resources :write_off_acts, only: %i[index create]
  resources :trucks
  get '/consignment/waybill_data/:consignment_id', to: 'consignments#waybill_data'
  resources :waybills
  resources :roles, only: :index
  resources :warehouses
  patch '/warehouses/trust/:id', to: 'warehouses#trust_warehouse'
  get '/goodsowners', to: 'goods_owner#index'
  scope '/checkpoints' do
    patch '/rollback', to: 'checkpoints#rollback'
    patch '/passCheckpoint', to: 'checkpoints#pass_checkpoint'
  end
  get '/checkpoints/:id', to: 'checkpoints#routes'
  namespace :api do
    namespace :v1 do
      resources :consignments, only: %i[index show] do
        resources :consignment_goods, only: :index
      end
      resources :drivers, only: [:index]
      resources :trucks, only: [:index]
    end
    namespace :v2 do
      resources :consignments, only: %i[index show]
    end
  end
end

# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#home'
  # User
  devise_for :users
  get '/users', to: 'pages#users_index'
  scope '/users' do
    post '/create', to: 'pages#create_user'
    get '/:id', to: 'pages#user_data'
    patch '/:id/edit', to: 'pages#update_user'
    delete '/:id', to: 'pages#destroy_user'
  end

  # Companies
  resources :companies
  scope '/companies' do
    patch '/:id/suspend', to: 'companies#suspend'
    patch '/:id/resume', to: 'companies#resume'
  end

  # Goods
  # resources :goods

  # Consignment
  resources :consignments
  # resources :consignments, only: %i[index create] do
  #   resources :goods, only: %i[update]
  # end
  # TODO: change implementation of scope below with a way above
  #
  patch '/consignment/:consignment_id/goods', to: 'goods#update'
  # Write-off Act
  resources :write_off_acts, only: %i[index create]

  # Trucks
  resources :trucks

  # Waybill
  resources :waybills

  # Roles
  resources :roles, only: :index

  # Warehouses
  resources :warehouses
  patch '/warehouses/trust/:id', to: 'warehouses#trust_warehouse'

  # Goods Owners
  get '/goodsowners', to: 'goods_owner#index'

  # Checkpoints
  scope '/checkpoints' do
    patch '/rollback', to: 'checkpoints#rollback'
    patch '/passCheckpoint', to: 'checkpoints#pass_checkpoint'
  end
  get '/checkpoints/:id', to: 'checkpoints#routes'

  # API
  namespace :api do
    # V1 API DEPRECATED
    # namespace :v1 do
    #   resources :consignments, only: %i[index show] do
    #     resources :consignment_goods, only: :index
    #   end
    #   resources :drivers, only: [:index]
    #   resources :trucks, only: [:index]
    # end
    namespace :v2 do
      resources :consignments, only: %i[index show]
    end
  end
end

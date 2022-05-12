# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#home'
  # User
  devise_for :users, path: 'auth', controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }
  resources :users
  # Companies
  resources :companies

  # Goods
  # resources :goods

  # Consignment
  resources :consignments,only: [:index,:create] do
    patch '/goods',to: 'goods#update'
  end
  # resources :consignments, only: %i[index create] do
  #   resources :goods, only: %i[update]
  # end
  # TODO: change implementation of scope below with a way above
  # Write-off Act
  resources :write_off_acts, only: %i[index create]

  # Trucks
  resources :trucks

  # Waybill
  resources :waybills

  # Roles
  resources :roles, only: :index

  # Warehouses
  resources :warehouses,except: :show

  # Goods Owners
  resources :goods_owner,only: :index

  # Checkpoints
  resources :checkpoints,only: :update

  # API
  namespace :api do
    # V1 API DEPRECATED
    # disable after demonstration
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

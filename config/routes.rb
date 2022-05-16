# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#home'
  # User
  devise_for :users, path: 'auth', controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }
  resources :users do
    resources :roles, only: :index
  end

  # Companies
  resources :companies

  # Consignment
  resources :consignments,only: [:index,:create] do
    resource :good,only: :update
  end
  #Write Off Acts
  resources :write_off_acts, only: %i[index create]

  # Waybill
  resources :waybills do
    resources :goods_owner,only: :index
  end

  resources :checkpoints,only: :update
  # Warehouses
  resources :warehouses,except: :show

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

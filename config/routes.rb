# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#home'
  # User
  devise_for :users, path: 'auth'
  resources :users

  # Companies
  resources :companies

  # Consignment
  resources :consignments,only: %i[index create] do
    collection do
      resources :write_off_acts, only: %i[index create]
    end
    resource :good,only: :update
  end

  # Waybill
  resources :waybills do
    collection do
      resources :checkpoints,only: :update
      resources :warehouses,except: :show
    end
    resources :goods_owner,only: :index
  end

  # API
  namespace :api do
    # V1 API DEPRECATED
    # disable after demonstration
    namespace :v1 do
      resources :consignments, only: %i[index show] do
        resources :consignment_goods, only: :index
      end
      resources :drivers, only: :index
      resources :trucks, only: :index
    end
    namespace :v2 do
      resources :consignments, only: %i[index show]
    end
  end
end

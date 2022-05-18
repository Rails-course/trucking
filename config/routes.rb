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

# Consignment
resources :consignments,only: %i[index create]

patch 'consignment/:consignment_id/goods',to: "goods#update"

resources :write_off_acts, only: %i[index create]

resources :waybills ,except: :show

resources :goods_owner,only: :index

resources :warehouses,except: :show
patch '/warehouses/trust/:id',to: 'warehouses#trust_warehouse'

patch '/checkpoints',to: 'checkpoints#update'

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

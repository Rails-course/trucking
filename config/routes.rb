# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#home'
  # User
  devise_for :users

  scope '/users' do
    get '/(:page)/(:perPage)',to: 'pages#users_index',as: "users"
    post '/create', to: 'pages#create_user'
    get '/:id', to: 'pages#user_data'
    patch '/:id/edit', to: 'pages#update_user'
    delete '/:id', to: 'pages#destroy_user'
  end

  # Companies
  resources :companies, except: :show do
    collection do
      get '/(:page)/(:perPage)',to: 'companies#index'
    end
  end

  # Consignment
  resources :consignments, only: %i[create] do
    collection do
      get '/(:page)/(:perPage)',to: 'consignments#index'
    end
  end
  patch 'consignment/:consignment_id/goods', to: 'goods#update'

  # Write off acts
  resources :write_off_acts, only: %i[index create] do
    collection do
      get '/(:page)/(:perPage)',to: 'write_off_acts#index'
    end
  end

  # Waybills
  resources :waybills, except: :show do
    collection do
      get '/(:page)/(:perPage)',to: "waybills#index"
    end
  end

  # warehouses
  resources :warehouses, except: %i[show index] do
    collection do
      get '/(:page)/(:perPage)',to: 'warehouses#index'
      patch 'trust/:id', to: 'warehouses#trust_warehouse'
    end
  end

  # Checkpoints
  patch '/checkpoints', to: 'checkpoints#update'

  # API
  namespace :api do
    # V1 API DEPRECATED
    # disable after demonstration
    namespace :v1 do
      resources :consignments, only:  :show do
        resources :consignment_goods, only: :index
        collection do
          get '/:page/:perPage',to: "consignments#index"
        end
      end
      resources :drivers, only: :index do
        collection do
          get '/(:page)/(:perPage)',to: "drivers#index"
        end
      end
      resources :trucks, only: :index do
        collection do
          get '/(:page)/(:perPage)',to: "trucks#index"
        end
      end
    end
    namespace :v2 do
      resources :consignments, only: %i[index show]
    end
  end
end

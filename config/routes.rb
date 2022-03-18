# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  resources :companies
  scope '/companies' do
    post '/create', to: 'companies#create_company'
    patch '/suspend/:id', to: 'companies#suspend'
  end
  resources :goods
  resources :consignments
  get '/consignments/:id/goods', to: 'goods#get_consignment_goods'
  resources :trucks
  get '/users', to: 'pages#users_index'
  scope '/users' do
    post '/create', to: 'pages#create_user'
    get '/drivers', to: 'pages#get_drivers'
    delete '/:id', to: 'pages#destroy_user'
    get '/:id', to: 'pages#user_data'
    patch 'edit/:id', to: 'pages#update_user'
  end
end

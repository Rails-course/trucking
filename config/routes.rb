# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  resources :companies
  scope '/users' do
    get '/new', to: 'pages#new_user'
    post '/create', to: 'pages#create_user'
    get '/drivers', to: 'pages#get_drivers'
  end
  resources :consignments
  resources :trucks
  scope '/companies' do
    post '/create', to: 'companies#create_company'
    patch '/suspend/:id', to: 'companies#suspend'
  end
end

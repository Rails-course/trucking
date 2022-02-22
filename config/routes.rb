# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  resources :companies
  get '/users', to: 'pages#new_user'
  scope '/users' do
    post '/create', to: 'pages#create_user'
    delete '/:id', to: 'pages#destroy_user'
  end
  # match '*path', to: 'pages#home', via: :all

  scope '/companies' do
    get '/new', to: 'companies#new_company'
    post '/create', to: 'companies#create_company'
  end
end

# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  get '/clients', to: 'users#index'

  scope '/users' do
    get '/new', to: 'pages#new_user'
    post '/create', to: 'pages#create_user'
  end
  # match '*path', to: 'pages#home', via: :all
end

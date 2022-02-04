Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  get '/clients',to: 'users#index'
  # match '*path', to: 'pages#home', via: :all
end

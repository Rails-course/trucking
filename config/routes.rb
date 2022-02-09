Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  resources :companies
  # match '*path', to: 'pages#home', via: :all
end

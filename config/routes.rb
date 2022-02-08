Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  get '/companies',to: 'companies#index'
  get '/companies/remove/:id',to: 'companies#delete'
  # match '*path', to: 'pages#home', via: :all
end

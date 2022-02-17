Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  resources :companies
  post '/companies/change_status/:id' ,to: 'companies#status'
  # match '*path', to: 'pages#home', via: :all
end

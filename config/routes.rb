Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  # match '*path', to: 'pages#home', via: :all
end

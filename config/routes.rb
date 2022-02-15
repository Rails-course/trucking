Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  resources :companies
  # match '*path', to: 'pages#home', via: :all

  scope '/companies' do
    get '/new', to: 'companies#new_company'
    post '/create', to: 'companies#create_company'
  end
end

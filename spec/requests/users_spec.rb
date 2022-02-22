require 'rails_helper'

RSpec.describe 'Users', type: :request do
  let(:user) { create(:user) }

  before do
    sign_in user
  end

  describe 'GET methods' do
    it 'get users/new' do
      get '/users/new'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'positive POST/PUT/DELETE methods' do
    it 'POST users/create' do
      post '/users/create',
           params: { user: { first_name: 'Jhon', second_name: 'Doe', middle_name: 'Doevich',
                             birthday: '01/01/2000', passport: '13746423', login: 'Jhondoe', email: 'JhonDoe@test.com',
                             password: 'password', password_confirmation: 'password', role: 'dispatcher',
                             town: 'London', street: 'Baker', building: 2, apartment: 21 } }
      expect(response).to have_http_status(:success)
    end
  end

  describe 'negative POST/PUT/DELETE methods' do
    it 'POST users/create' do
      user_count = User.all.count
      post '/users/create',
           params: { user: { first_name: 'as', second_name: 'Doe', middle_name: 'Doevich',
                             birthday: '01/01/2000', passport: '---------', login: 'Jhondoe', email: 'JhonDoe@test.com',
                             password: 'password', password_confirmation: 'password', role: 'dispatcher',
                             town: 'London', street: 'Baker', building: 2, apartment: 21 } }
      expect(User.all.count).to eq(user_count)
    end
  end
end

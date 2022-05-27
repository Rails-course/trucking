require 'rails_helper'

RSpec.describe 'warehouses', type: :request do
  let(:user) { create(:user,role_id: 6) }

  before do
    sign_in user
  end
  describe 'GET methods' do
    it 'get users' do
      get '/warehouses'
      expect(response).to have_http_status(:success)
    end
    it 'GET first page with 10 warehouses per page' do
      sign_in User.find(1)
      get '/warehouses/0/10'
      expect(JSON.parse(response.body).length).to eq(2)
    end
  end
end

require 'rails_helper'

RSpec.describe 'consignments', type: :request do
  let(:user) { create(:user,role_id: 6) }

  before do
    sign_in user
  end
  describe 'GET methods' do
    it 'get users' do
      get '/consignments'
      expect(response).to have_http_status(:success)
    end
    it 'GET first page with 10 consignments per page' do
      sign_in User.find(1)
      get '/consignments/0/10'
      expect(JSON.parse(response.body).length).to eq(10)
    end
  end
end

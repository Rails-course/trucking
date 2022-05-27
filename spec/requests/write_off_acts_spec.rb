require 'rails_helper'

RSpec.describe 'Write_off_acts', type: :request do
  let(:user) { create(:user,role_id: 6) }

  before do
    sign_in user
  end
  describe 'GET methods' do
    it 'get users' do
      get '/write_off_acts'
      expect(response).to have_http_status(:success)
    end
    it 'GET first page with 10 acts per page' do
      sign_in User.find(1)
      get '/write_off_acts/0/10'
      expect(JSON.parse(response.body).length).to eq(6)
    end
  end
end

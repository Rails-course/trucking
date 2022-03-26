require 'rails_helper'

RSpec.describe 'Goods', type: :request do
  let(:user) { create(:user_sysAdmin) }

  before do
    sign_in user
  end

  describe 'positive POST/PUT/DELETE methods' do
    it 'POST goods' do
      post '/goods',
           params: { newGoods: [
             { bundle_seria: 'BS', bundle_numbe: 11, good_name: 'Potato',
               unit_of_measurement: 'kilos',
               quantity: 10 },
             { bundle_seria: 'BS', bundle_numbe: 11, good_name: 'Carrots',
               unit_of_measurement: 'kilos',
               quantity: 5 }
           ] }
      expect(response).to have_http_status(:success)
    end
  end
end

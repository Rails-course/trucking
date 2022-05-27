require 'rails_helper'

RSpec.describe 'warehouse trucks', type: :request do
  describe 'GET methods' do
    it 'get trucks' do
      FactoryBot.create_list(:truck,5)
      headers= { 'authorization'=> 'Basic c2hvcHBpbmdjZW50ZXJvd25lckBleGFtcGxlLmNvbTpzaG9wcGluZ2NlbnRlcm93bmVyMTIz' }
      get '/api/v1/trucks/0/5',:params => { }, :headers => headers
      trucks=JSON.parse(response.body)
      expect(JSON.parse(trucks["trucks"]).count).to eq(5)
    end
  end
end

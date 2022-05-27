require 'rails_helper'

RSpec.describe 'warehouse consignments', type: :request do
  describe 'GET methods' do
    it 'get consignments' do
      headers= { 'authorization'=> 'Basic c2hvcHBpbmdjZW50ZXJvd25lckBleGFtcGxlLmNvbTpzaG9wcGluZ2NlbnRlcm93bmVyMTIz' }
      get '/api/v1/consignments',:params => { }, :headers => headers
      expect(JSON.parse(response.body)['consignments_count']).to eq(30)
    end
  end
end

require 'rails_helper'

RSpec.describe 'warehouse drivers', type: :request do
  describe 'GET methods' do
    it 'get drivers' do
      headers= { 'authorization'=> 'Basic c2hvcHBpbmdjZW50ZXJvd25lckBleGFtcGxlLmNvbTpzaG9wcGluZ2NlbnRlcm93bmVyMTIz' }
      get '/api/v1/drivers',:params => { }, :headers => headers
      expect(JSON.parse(response.body)['drivers_count']).to eq(2)
    end
  end
end

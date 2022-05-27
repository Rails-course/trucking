require 'rails_helper'

RSpec.describe 'warehouse trucks', type: :request do
  describe 'GET methods' do
    it 'get trucks' do
      headers= { 'authorization'=> 'Basic c2hvcHBpbmdjZW50ZXJvd25lckBleGFtcGxlLmNvbTpzaG9wcGluZ2NlbnRlcm93bmVyMTIz' }
      get '/api/v1/trucks',:params => { }, :headers => headers
      expect(JSON.parse(response.body)['trucks_count']).to eq(4)
    end
  end
end

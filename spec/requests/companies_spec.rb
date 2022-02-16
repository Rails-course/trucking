require 'rails_helper'

RSpec.describe 'Companies', type: :request do
  let(:company) { create(:company) }

  before do
    sign_in create(:user)
  end

  describe 'DELETE /companies' do
    it 'valid delete' do
      delete "/companies/#{company.id}"
      expect(response).to have_http_status(204)
    end
    it 'invalid delete' do
      delete "/companies/#{company.id + 1}"
      expect(response).to have_http_status(404)
    end
  end
end

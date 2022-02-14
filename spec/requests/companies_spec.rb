require 'rails_helper'

RSpec.describe "Companies", type: :request do
  include Warden::Test::Helpers
  before(:each) do
    Warden.test_mode!
    user = instance_double(User, to_key: 1, authenticatable_salt: 'example')
    login_as(create(:user), scope: 'user')
  end
  describe "DELETE /companies" do
    it 'valid delete' do
      company=create(:company)
      delete "/companies/#{company.id}"
      expect(response).to have_http_status(204)
    end
    it 'invalid delete' do
      company=create(:company)
      delete "/companies/#{company.id+1}"
      expect(response).to have_http_status(404)
  end
end
end
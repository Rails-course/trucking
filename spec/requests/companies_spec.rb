require 'rails_helper'

RSpec.describe "Companies", type: :request do
  let(:company) { create(:company) }
  before(:each) do
    sign_in create(:user)
  end
  describe "DELETE /companies" do
    it 'valid delete request' do
      delete "/companies/#{company.id}"
      expect(response).to have_http_status(204)
    end
    it 'valid delete action' do
      company_count=Company.all.count
      delete "/companies/#{company.id}"
      expect(Company.all.count).to eq(company_count)
    end
    it 'invalid delete request' do
      delete "/companies/#{company.id+1}"
      expect(response).to have_http_status(404)
  end
  end
  describe "status /companies" do
    it 'valid status request' do
      post "/companies/change_status/#{company.id}"
      expect(response).to have_http_status(204)
    end
    it 'valid status action' do
      post "/companies/change_status/#{company.id}"
      expect(Company.find(company.id).status).to eq(true)
    end
    it 'invalid status request' do
      post "/companies/change_status/#{company.id+1}"
      expect(Company.find(company.id).status).to eq(false)
    end
  end
end
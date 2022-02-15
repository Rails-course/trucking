require 'rails_helper'

RSpec.describe "Companies", type: :request do
  before(:each) do
    sign_in create(:user)
  end
  describe "CREATE /companies" do
    it 'creates company' do
      companyName = 'My comp'
      post "/companies/create", :params => { :name => companyName }
      expect(Company.last.name).to eq(companyName)
    end
  end
end

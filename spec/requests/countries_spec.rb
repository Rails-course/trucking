require 'rails_helper'

RSpec.describe "Countries", type: :request do
  let(:user) { create(:user_sysAdmin) }

  before do
    sign_in user
  end

  describe "GET standard CRUD methods" do
    it 'get 5 countries' do
      create_list(:country, 5)
      get '/settings/countries?page=0&per_page=5'
      expect(JSON.parse(response.body)['countries'].size).to eq(5)
    end
    it 'create country' do
      total_count = Country.count
      post '/settings/countries' ,params:{name: 'country_for_test'}
      expect(total_count+1).to eq(Country.count)
    end
    it 'update country' do
      country = create(:country)
      patch "/settings/countries/#{country.id}" ,params:{name: 'country_for_test'}
      expect(Country.find(country.id).name).to eq('country_for_test')
    end
    it 'delete country' do
      country = create(:country)
      total_count = Country.count
      delete "/settings/countries/#{country.id}"
      expect(total_count-1).to eq(Country.count)
    end
  end
end

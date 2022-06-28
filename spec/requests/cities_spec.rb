require 'rails_helper'

RSpec.describe "Cities", type: :request do
  let(:user) { create(:user_sysAdmin) }
  let(:country) {create(:country)}
  before do
    sign_in user
  end

  describe "GET standard CRUD methods" do
    it 'get 5 cities' do
      create_list(:city, 5,country: country)
      get "/settings/countries/#{country.id}/cities?page=0&per_page=5"
      expect(JSON.parse(response.body)['cities'].size).to eq(5)
    end
    it 'create country' do
      total_count = City.count
      post "/settings/countries/#{country.id}/cities" ,params:{name: 'city_for_test'}
      expect(total_count+1).to eq(City.count)
    end
    it 'update country' do
      city = create(:city)
      patch "/settings/countries/#{country.id}/cities/#{city.id}" ,params:{name: 'city_for_test'}
      expect(City.find(city.id).name).to eq('city_for_test')
    end
    it 'delete country' do
      city = create(:city)
      total_count = City.count
      delete "/settings/countries/#{country.id}/cities/#{city.id}"
      expect(total_count-1).to eq(City.count)
    end
  end
end

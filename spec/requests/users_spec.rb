require 'rails_helper'

RSpec.describe 'Users', type: :request do
  before(:each) do
    sign_in create(:user)
  end
  describe "CREATE /users" do
    it 'creates user' do
      first_name = 'Ivan'
      # middle_name = 'Ivanovich'
      # second_name = 'Ivanov'
      post "/users/create", :params => { :first_name => first_name}
      expect(User.last.first_name).to eq(first_name)
    end
  end
end

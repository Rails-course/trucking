require 'rails_helper'

RSpec.describe 'Waybills', type: :request do
  let(:user) { create(:user) }


  before do
    sign_in user
  end
  describe 'positive POST/PUT/DELETE methods' do
    it 'POST waybill/create' do
      warehouse =create(:warehouse)
      consignment =create(:consignment)
      goods_owner =create(:goods_owner)
      post '/waybills',
           params: { waybill: { end_date: '10.10.2021', start_date: '10.10.2021',town:'asd',
                                street:'asd', building:'12',
                                end_town:'asd', end_street:'asd', end_building:'12',
                                goods_owner:goods_owner.id, waybill_number:'122',
                                waybill_seria:'sd',
                                warehouse:warehouse.id},consignment_id:consignment.id }
      expect(response).to eq('1')
    end
  end
end

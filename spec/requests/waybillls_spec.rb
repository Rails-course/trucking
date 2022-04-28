require 'rails_helper'

RSpec.describe 'Waybills', type: :request do
  let(:user) { create(:user) }
  let(:consignment) { create(:consignment) }
  let(:warehouse) { create(:warehouse) }
  let(:goods_owner) { create(:goods_owner) }

  before do
    sign_in user
  end
  describe 'positive POST/PUT/DELETE methods' do
    it 'POST waybill/create' do
      post '/waybills',
           params: { waybill: { end_date: '10.10.2021', start_date: '10.10.2021', town: 'asd',
                                street: 'asd', building: '12',
                                end_town: 'asd', end_street: 'asd', end_building: '12',
                                goods_owner: goods_owner.goods_owner_name, waybill_number: '122',
                                waybill_seria: 'sda',
                                warehouse: warehouse.warehouse_name }, consignment_id: consignment.id }
      expect(response).to have_http_status(:success)
    end
  end
end

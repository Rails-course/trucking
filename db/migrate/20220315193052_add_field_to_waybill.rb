class AddFieldToWaybill < ActiveRecord::Migration[5.2]
  def change
    add_column :waybills, :endpoint, :integer
    add_column :waybills, :startpoint, :integer
    add_column :waybills, :goods_owner_id, :integer
    change_column :waybills, :status, :string, default: 'transportation started'
  end
end

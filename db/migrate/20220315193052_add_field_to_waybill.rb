class AddFieldToWaybill < ActiveRecord::Migration[5.2]
  def change
    add_column :waybills, :endpoint, :integer
    add_column :waybills, :startpoint, :integer
  end
end

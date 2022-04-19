class AddFieldsToWaybill < ActiveRecord::Migration[5.2]
  def change
    add_column :waybills, :waybill_seria, :string,null: false
    add_column :waybills, :waybill_number, :integer,null: false
  end
end

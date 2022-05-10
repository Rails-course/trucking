class AddFieldsToWaybill < ActiveRecord::Migration[5.2]
  def change
    add_column :waybills, :waybill_seria, :string,null: false,unique: true
    add_column :waybills, :waybill_number, :integer,null: false,unique: true
    add_index :waybills, %i[waybill_seria waybill_number], unique: true
  end
end

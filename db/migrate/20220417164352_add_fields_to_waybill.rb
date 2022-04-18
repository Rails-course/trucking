class AddFieldsToWaybill < ActiveRecord::Migration[5.2]
  def change
    add_column :waybills, :seria, :string
    add_column :waybills, :number, :integer
  end
end

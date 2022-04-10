class UpdateTruckFields < ActiveRecord::Migration[5.2]
  def change
    change_column :trucks, :truck_number, :string
  end
  add_reference :trucks, :company, index: false
end

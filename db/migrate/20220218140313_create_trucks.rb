class CreateTrucks < ActiveRecord::Migration[5.2]
  def change
    create_table :trucks do |t|
      t.float :fuel_consumption, null: false
      t.integer :truck_number, null: false
      t.timestamps
    end

    add_reference :trucks, :truck_type, index: false
  end
end

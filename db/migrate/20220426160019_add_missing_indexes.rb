class AddMissingIndexes < ActiveRecord::Migration[5.2]
  def change
    add_index :trucks, :truck_number, unique: true
    add_index :truck_types, :truck_type_name, unique: true
  end
end

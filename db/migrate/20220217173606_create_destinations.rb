class CreateDestinations < ActiveRecord::Migration[5.2]
  def change
    create_table :destinations do |t|
      t.string :destination_name, null: false
      t.timestamps
    end

    add_reference :destinations, :address, new_user: false
    add_index :destinations, :destination_name, unique: true
  end
end

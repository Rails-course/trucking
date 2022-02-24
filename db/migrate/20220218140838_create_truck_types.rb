class CreateTruckTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :truck_types do |t|
      t.string :truck_type_name, null: false
      t.timestamps
    end
  end
end

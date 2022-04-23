class CreateWriteOffActs < ActiveRecord::Migration[5.2]
  def change
    create_table :write_off_acts do |t|
      t.string :good_name, null: false
      t.integer :lost_quantity, null: false, default: 0
      t.timestamps
    end
    add_reference :write_off_acts, :consignment, index: false
  end
end

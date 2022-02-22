class CreateGoods < ActiveRecord::Migration[5.2]
  def change
    create_table :goods do |t|
      t.string :good_name, null: false
      t.integer :quantity, null: false
      t.string :unit_of_measurement, null: false
      t.string :status, null: false
      t.integer :bundle_num
      t.timestamps
    end
  end
end

class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :town
      t.string :street
      t.integer :building
      t.integer :apartment, null: true

      t.timestamps
    end
  end
end

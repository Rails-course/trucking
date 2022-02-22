class CreateConsignments < ActiveRecord::Migration[5.2]
  def change
    create_table :consignments do |t|
      t.string :status, null: false
      t.string :bundle_seria, null: false, default: 'BS'
      t.string :bundle_number, null: false, unique: true
      t.string :consignment_seria, null: false
      t.integer :consignment_number, null: false
      t.timestamps
    end
    add_reference :consignments, :user, index: false
    add_reference :consignments, :goods_owner, index: false
    add_reference :consignments, :destination, index: false
    add_reference :consignments, :truck, index: false
  end
end

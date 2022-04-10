class CreateGoodsOwner < ActiveRecord::Migration[5.2]
  def change
    create_table :goods_owners do |t|
      t.string :warehouse_name, null: false
    end

    add_reference :goods_owners, :address, index: false
    add_index :goods_owners, :warehouse_name, unique: true
  end
end

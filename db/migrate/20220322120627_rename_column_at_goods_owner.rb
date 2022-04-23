class RenameColumnAtGoodsOwner < ActiveRecord::Migration[5.2]
  def change
    rename_column :goods_owners, :warehouse_name, :goods_owner_name
  end
end

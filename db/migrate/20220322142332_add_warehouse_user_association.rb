class AddWarehouseUserAssociation < ActiveRecord::Migration[5.2]
  def change
    add_column :warehouses, :warehouseman_id, :bigint
  end
end

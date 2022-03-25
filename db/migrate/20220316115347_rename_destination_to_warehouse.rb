class RenameDestinationToWarehouse < ActiveRecord::Migration[5.2]
  def change
    rename_column :destinations, :destination_name, :warehouse_name
    rename_table :destinations, :warehouses
  end
end

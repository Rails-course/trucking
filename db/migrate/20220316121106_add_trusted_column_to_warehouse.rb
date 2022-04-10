class AddTrustedColumnToWarehouse < ActiveRecord::Migration[5.2]
  def change
    add_column :warehouses, :trusted, :boolean, default: false, null: false
  end
end

class UpdateConsignmentFields < ActiveRecord::Migration[5.2]
  def change
    remove_column :consignments, :goods_owner_id, :bigint
    remove_column :consignments, :destination_id, :bigint
    rename_column :consignments, :user_id, :driver_id
    add_column :consignments, :dispatcher_id, :bigint
    add_column :consignments, :manager_id, :bigint
  end
end

class RenameWaybillField < ActiveRecord::Migration[5.2]
  def change
    rename_column :waybills, :startpoint, :startpoint_id
    rename_column :waybills, :endpoint, :endpoint_id
  end
end

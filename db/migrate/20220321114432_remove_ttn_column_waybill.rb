class RemoveTtnColumnWaybill < ActiveRecord::Migration[5.2]
  def change
    remove_column :waybills, :ttn_id, :integer
  end
end

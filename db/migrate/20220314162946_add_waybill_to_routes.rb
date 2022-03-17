class AddWaybillToRoutes < ActiveRecord::Migration[5.2]
  def change
    add_column :routes, :waybill_id, :integer
  end
end

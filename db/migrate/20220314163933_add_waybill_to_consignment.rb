class AddWaybillToConsignment < ActiveRecord::Migration[5.2]
  def change
    add_column :waybills, :consignment_id, :integer
  end
end

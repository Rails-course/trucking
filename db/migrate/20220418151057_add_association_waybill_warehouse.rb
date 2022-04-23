class AddAssociationWaybillWarehouse < ActiveRecord::Migration[5.2]
  def change
    add_reference :waybills, :warehouse, index: true
  end
end

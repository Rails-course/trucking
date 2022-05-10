class UpdateConsignmentGoodsAssociation < ActiveRecord::Migration[5.2]
  def change
    remove_column :goods, :bundle_seria, :string
    remove_column :goods, :bundle_number, :integer
  end
  add_reference :goods, :consignment, index: true
end

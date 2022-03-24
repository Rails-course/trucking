class CreateIndexOnConsignmentSeriaNumber < ActiveRecord::Migration[5.2]
  def change
    add_index :consignments, %i[consignment_seria consignment_number], unique: true
    add_index :consignments, %i[bundle_seria bundle_number], unique: true
    add_index :goods, %i[good_name bundle_seria bundle_number], unique: true
  end
end

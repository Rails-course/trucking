class AddDefaultStatusConsignment < ActiveRecord::Migration[5.2]
  def change
    change_column :consignments, :status, :string, null: false, default: 'registered'
  end
end

class AddAddressAssociationToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :address, index: false
  end
end

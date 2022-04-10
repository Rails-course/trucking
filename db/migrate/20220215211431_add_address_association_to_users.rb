class AddAddressAssociationToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :address, new_user: false
  end
end

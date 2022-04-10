# frozen_string_literal: true

class AddRoleAssociationToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :role, new_user: false
  end
end

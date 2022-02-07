# frozen_string_literal: true

class AddRoleAssociationToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :role, index: false
  end
end

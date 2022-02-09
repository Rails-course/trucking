# frozen_string_literal: true

class CreateRoles < ActiveRecord::Migration[5.2]
  def change
    create_table :roles do |t|
      t.string :role_name, null: false
    end

    add_index :roles, :role_name, unique: true
  end
end

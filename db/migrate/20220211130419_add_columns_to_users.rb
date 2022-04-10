class AddColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :name
    add_column :users, :first_name, :string
    add_column :users, :second_name, :string
    add_column :users, :middle_name, :string
    add_column :users, :birthday, :date
    add_column :users, :login, :string
    add_index :users, :login, unique: true
    add_reference :users, :company, new_user: false
  end
end

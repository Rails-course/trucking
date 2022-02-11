class AddColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :name
    add_column :users, :first_name, :string
    add_column :users, :second_name, :string
    add_column :users, :middle_name, :string
    add_column :users, :birthday, :date
    add_reference :users, :company, index: false
  end
end

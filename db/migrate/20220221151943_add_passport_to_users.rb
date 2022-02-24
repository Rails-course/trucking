class AddPassportToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :passport, :text
  end
end

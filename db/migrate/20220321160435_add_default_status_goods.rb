class AddDefaultStatusGoods < ActiveRecord::Migration[5.2]
  def change
    change_column :goods, :status, :string, null: false, default: 'accepted'
  end
end

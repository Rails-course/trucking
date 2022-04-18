class UpdateCompanySuspendeField < ActiveRecord::Migration[5.2]
  def change
    change_column :companies, :is_suspended, :boolean, null: false, default: false
  end
end

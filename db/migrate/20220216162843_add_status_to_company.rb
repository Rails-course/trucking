class AddStatusToCompany < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :status, :boolean
  end
end

class RenameCompanyStatus < ActiveRecord::Migration[5.2]
  def change
    rename_column :companies,:status,:is_suspended
  end
end

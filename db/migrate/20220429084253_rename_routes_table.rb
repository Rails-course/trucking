class RenameRoutesTable < ActiveRecord::Migration[5.2]
  def change
    rename_table :routes, :checkpoints
  end
end

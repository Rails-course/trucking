class AddDescriptiontoWriteOffAct < ActiveRecord::Migration[5.2]
  def change
    add_column :write_off_acts, :description, :text
  end
end

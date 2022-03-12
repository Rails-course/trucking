class CreateWaybill < ActiveRecord::Migration[5.2]
  def change
    create_table :waybills do |t|
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :ttn_id
      t.timestamps
    end
  end
end

class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
          t.string :city
          t.date :pass_date
          t.boolean :is_passed
          t.timestamps
    end
  end
end

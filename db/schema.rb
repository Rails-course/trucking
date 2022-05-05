# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_29_084253) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "town"
    t.string "street"
    t.integer "building"
    t.integer "apartment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "checkpoints", force: :cascade do |t|
    t.string "city"
    t.date "pass_date"
    t.boolean "is_passed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "waybill_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_suspended", default: false, null: false
    t.index ["name"], name: "index_companies_on_name", unique: true
  end

  create_table "consignments", force: :cascade do |t|
    t.string "status", default: "registered", null: false
    t.string "bundle_seria", default: "BS", null: false
    t.string "bundle_number", null: false
    t.string "consignment_seria", null: false
    t.integer "consignment_number", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "driver_id"
    t.bigint "truck_id"
    t.bigint "dispatcher_id"
    t.bigint "manager_id"
    t.index ["bundle_seria", "bundle_number"], name: "index_consignments_on_bundle_seria_and_bundle_number", unique: true
    t.index ["consignment_seria", "consignment_number"], name: "index_consignments_on_consignment_seria_and_consignment_number", unique: true
  end

  create_table "goods", force: :cascade do |t|
    t.string "good_name", null: false
    t.integer "quantity", null: false
    t.string "unit_of_measurement", null: false
    t.string "status", default: "accepted", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "consignment_id"
    t.index ["consignment_id"], name: "index_goods_on_consignment_id"
  end

  create_table "goods_owners", force: :cascade do |t|
    t.string "goods_owner_name", null: false
    t.bigint "address_id"
    t.index ["goods_owner_name"], name: "index_goods_owners_on_goods_owner_name", unique: true
  end

  create_table "logs", force: :cascade do |t|
  end

  create_table "roles", force: :cascade do |t|
    t.string "role_name", null: false
    t.index ["role_name"], name: "index_roles_on_role_name", unique: true
  end

  create_table "truck_types", force: :cascade do |t|
    t.string "truck_type_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["truck_type_name"], name: "index_truck_types_on_truck_type_name", unique: true
  end

  create_table "trucks", force: :cascade do |t|
    t.float "fuel_consumption", null: false
    t.string "truck_number", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "truck_type_id"
    t.bigint "company_id"
    t.index ["truck_number"], name: "index_trucks_on_truck_number", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "role_id"
    t.string "first_name"
    t.string "second_name"
    t.string "middle_name"
    t.date "birthday"
    t.string "login"
    t.bigint "company_id"
    t.bigint "address_id"
    t.text "passport"
    t.index ["address_id"], name: "index_users_on_address_id"
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["login"], name: "index_users_on_login", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  create_table "warehouses", force: :cascade do |t|
    t.string "warehouse_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "address_id"
    t.boolean "trusted", default: false, null: false
    t.bigint "warehouseman_id"
    t.index ["address_id"], name: "index_warehouses_on_address_id"
    t.index ["warehouse_name"], name: "index_warehouses_on_warehouse_name", unique: true
  end

  create_table "waybills", force: :cascade do |t|
    t.date "start_date", null: false
    t.date "end_date", null: false
    t.string "status", default: "transportation started"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "consignment_id"
    t.integer "endpoint_id"
    t.integer "startpoint_id"
    t.integer "goods_owner_id"
    t.string "waybill_seria", null: false
    t.integer "waybill_number", null: false
    t.bigint "warehouse_id"
    t.index ["warehouse_id"], name: "index_waybills_on_warehouse_id"
    t.index ["waybill_seria", "waybill_number"], name: "index_waybills_on_waybill_seria_and_waybill_number", unique: true
  end

  create_table "write_off_acts", force: :cascade do |t|
    t.string "good_name", null: false
    t.integer "lost_quantity", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "consignment_id"
    t.text "description"
  end

end

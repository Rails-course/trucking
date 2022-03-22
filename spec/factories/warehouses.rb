FactoryBot.define do
  factory :warehouse do
    sequence(:warehouse_name) { |i| "warehouse_name_#{i}" }
    association(:address)
    warehouseman { create(:user_warehouseman) }
  end
end

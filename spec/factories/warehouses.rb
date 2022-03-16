FactoryBot.define do
  factory :warehouse do
    sequence(:warehouse_name) { |i| "warehouse_name_#{i}" }
    association(:address)
  end
end

FactoryBot.define do
  factory :goods_owner do
    sequence(:warehouse_name) { |i| "warehouse_name_#{i}" }
    association(:address)
  end
end

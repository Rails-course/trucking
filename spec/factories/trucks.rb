FactoryBot.define do
  factory :truck do
    fuel_consumption { 42.42 }
    truck_number { 422 }
    association(:truck_type)
  end
end

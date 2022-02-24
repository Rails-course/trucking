FactoryBot.define do
  factory :good do
    good_name{ 'Potato' }
    quantity{ 12 }
    unit_of_measurement{ 'item' }
    status{ 'Not delivered' }
    bundle_number{ 4 }
  end
end

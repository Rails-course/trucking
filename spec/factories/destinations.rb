FactoryBot.define do
  factory :destination do
    sequence(:destination_name) { |i| "destination_name_#{i}" }
    association(:address)
  end
end

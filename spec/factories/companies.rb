FactoryBot.define do
  factory :company do
    sequence(:name) { |i| "company_#{i}" }
  end
end

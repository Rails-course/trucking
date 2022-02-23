FactoryBot.define do
  factory :consignment do
    driver { create(:user_driver) }
    dispatcher { create(:user_dispatcher) }
    manager { create(:user_manager) }
    association(:truck)
    status { 'registered' }
    consignment_seria { 'CS' }
    sequence(:consignment_number) { |i| i.to_i }
    bundle_seria { 'BS' }
    sequence(:bundle_number) { |i| i.to_i }
  end
end

# frozen_string_literal: true

FactoryBot.define do
  factory :role do
    sequence(:role_name) { |i| "role_#{i}" }

    trait :sysAdmin do
      role_name { 'system administrator' }
    end
    trait :admin do
      role_name { 'admin' }
    end
    trait :owner do
      role_name { 'owner' }
    end
    trait :dispatcher do
      role_name { 'dispatcher' }
    end
    trait :manager do
      role_name { 'manager' }
    end
    trait :driver do
      role_name { 'driver' }
    end
    trait :warehouseman do
      role_name { 'warehouseman' }
    end
    factory :sysAdmin_role, traits: [:sysAdmin]
    factory :admin_role, traits: [:admin]
    factory :owner_role, traits: [:owner]
    factory :dispatcher_role, traits: [:dispatcher]
    factory :manager_role, traits: [:manager]
    factory :driver_role, traits: [:driver]
    factory :warehouseman_role, traits: [:warehouseman]
  end
end

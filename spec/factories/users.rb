# frozen_string_literal: true

FactoryBot.define do
  # TODO: add association fields after creating certain tables
  factory :user do
    email { 'test@test.com' }
    password { 'password1' }
    first_name { 'Ivan' }
    second_name { 'Ivanov' }
    middle_name { 'Ivanovich' }
    birthday { '01/01/1970' }
    passport { '43243451, issued by the police department of the Leninsky district of Minsk' }
    sequence(:login) { |i| "login_#{i}" }
    association(:company)
    association(:address)
    role

    trait :driver do
      association :role, factory: :driver_role
    end

    trait :dispatcher do
      association :role, factory: :dispatcher_role
    end

    trait :manager do
      association :role, factory: :manager_role
    end

    factory :user_driver, traits: [:driver]
    factory :user_dispatcher, traits: [:dispatcher]
    factory :user_manager, traits: [:manager]
  end
end

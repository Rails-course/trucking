# frozen_string_literal: true

FactoryBot.define do
  # TODO: add association fields after creating certain tables
  factory :user do
    sequence(:email) { |i| "test#{i}@test.com" }
    password { 'password1' }
    first_name { 'Ivan' }
    second_name { 'Ivanov' }
    middle_name { 'Ivanovich' }
    birthday { '01/01/1970' }
    sequence(:login) { |i| "login_#{i}" }
    association(:role)
    association(:address)
  end
end

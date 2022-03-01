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
    passport { '43243451, issued by the police department of the Leninsky district of Minsk' }
    sequence(:login) { |i| "login_#{i}" }
    association(:role)
    association(:company)
    association(:address)
  end
end

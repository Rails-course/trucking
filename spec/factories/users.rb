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
    login { 'IvanovichII' }
    association(:role)
  end
end

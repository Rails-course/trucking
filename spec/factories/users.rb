# frozen_string_literal: true

FactoryBot.define do
  # TODO: this factory should be updated when additional fields will be added
  factory :user do
    email { 'test@test.com' }
    password { 'password1' }
    name { 'Jhon Doe' }
    role
  end
end

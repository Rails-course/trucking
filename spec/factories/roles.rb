# frozen_string_literal: true

FactoryBot.define do
  factory :role do
    sequence(:role_name) { |i| "role_#{i}" }
  end
end

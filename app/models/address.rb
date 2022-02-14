class Address < ApplicationRecord
  has_many :users, dependent: :nullify
end

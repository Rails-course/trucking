# frozen_string_literal: true

class Company < ApplicationRecord
  has_many :users, dependent: :destroy
  validates :name, presence: true, length: { in: 3..30 }
end

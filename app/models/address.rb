class Address < ApplicationRecord
  has_many :users, dependent: :nullify
  validates :town, presence: true, length: { in: 3..30 }
  validates :street, presence: true, length: { in: 3..30 }
  validates :building, presence: true, numericality: { greater_than: 0 }
  validates :apartment, presence: false, numericality: { greater_than: 0 }
end

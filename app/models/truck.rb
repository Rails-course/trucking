# frozen_string_literal: true

class Truck < ApplicationRecord
  belongs_to :truck_type
  belongs_to :company
  validates :fuel_consumption, presence: true, numericality: { greater_than: 0 }
  validates :truck_number, presence: true, length: { in: 3..30 }, uniqueness: true

  scope :by_number, ->(search) { where("truck_number iLIKE '#{search}%'") }
end

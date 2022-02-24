class Truck < ApplicationRecord
  belongs_to :truck_type
  belongs_to :company
  validates :fuel_consumption, presence: true, numericality: { greater_than: 0 }
  validates :truck_number, presence: true, numericality: { greater_than: 0 }
end
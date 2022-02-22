class Good < ApplicationRecord
  validates :good_name, presence: true, length: { in: 2..45 }
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validates :unit_of_measurement, presence: true, length: { in: 2..15 }
  validates :status, presence: true, length: { in: 3..30 }
  validates :bundle_num, numericality: { greater_than: 0 }
end

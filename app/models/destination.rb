class Destination < ApplicationRecord
  has_many :consignments, dependent: :restrict_with_exception
  belongs_to :address
  validates :destination_name, presence: true, uniqueness: true, length: { in: 3..30 }
end

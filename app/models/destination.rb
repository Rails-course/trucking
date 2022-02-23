class Destination < ApplicationRecord
  belongs_to :address
  validates :destination_name, presence: true, uniqueness: true, length: { in: 3..30 }
end

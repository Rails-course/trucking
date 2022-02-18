class GoodsOwner < ApplicationRecord
  belongs_to :address
  validates :warehouse_name, presence: true, uniqueness: true, length: { in: 3..30 }
end

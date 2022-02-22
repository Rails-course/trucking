# frozen_string_literal: true

class GoodsOwner < ApplicationRecord
  belongs_to :address
  has_many :consignments, dependent: :restrict_with_exception
  validates :warehouse_name, presence: true, uniqueness: true, length: { in: 3..30 }
end

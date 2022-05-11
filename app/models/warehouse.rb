# frozen_string_literal: true

class Warehouse < ApplicationRecord
  belongs_to :address
  belongs_to :warehouseman, class_name: 'User'
  has_many :waybills, dependent: :restrict_with_exception
  validates :warehouse_name, presence: true, uniqueness: true, length: { in: 3..30 }
  def toggle_trusted
    update(trusted: !trusted)
  end
end

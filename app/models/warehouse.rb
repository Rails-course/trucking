# frozen_string_literal: true

class Warehouse < ApplicationRecord
  belongs_to :address
  validates :warehouse_name, presence: true, uniqueness: true, length: { in: 3..30 }
  def toggle_trusted
    toggle!(:trusted)
  end
end

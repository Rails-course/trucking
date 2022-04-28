# frozen_string_literal: true

class Route < ApplicationRecord
  validates :city, presence: true, length: { in: 3..15 }
  belongs_to :waybill
end

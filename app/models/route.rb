# frozen_string_literal: true

class Route < ApplicationRecord
  validates :city, presence: true
  has_one :waybill
end

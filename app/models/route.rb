# frozen_string_literal: true

class Route < ApplicationRecord
  validates :city, presence: true
end

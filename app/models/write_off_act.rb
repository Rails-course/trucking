# frozen_string_literal: true

class WriteOffAct < ApplicationRecord
  belongs_to :consignment
  validates :good_name, presence: true, length: { in: 2..45 }
  validates :lost_quantity, presence: true, numericality: { greater_than: 0 }
end

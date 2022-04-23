# frozen_string_literal: true

class Waybill < ApplicationRecord
  has_many :routes
  belongs_to :consignment
  belongs_to :goods_owner
  belongs_to :warehouse
  belongs_to :endpoint, class_name: 'Address'
  belongs_to :startpoint, class_name: 'Address'
  validates :waybill_number, presence: true, numericality: { greater_than: 0 }
  validates :waybill_seria, presence: true, length: { in: 2..10 },
                            uniqueness: { scope: :waybill_number }
end

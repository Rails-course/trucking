# frozen_string_literal: true

class Waybill < ApplicationRecord
  has_many :routes
  belongs_to :consignment
  belongs_to :goods_owner
  belongs_to :endpoint, class_name: 'Address'
  belongs_to :startpoint, class_name: 'Address'
  validates :waybill_number, uniqueness: true, numericality: { greater_than: 0 }
  validates :waybill_seria, uniqueness: { scope: :consignment_number }
end

# frozen_string_literal: true

class Waybill < ApplicationRecord
  has_many :routes
  belongs_to :consignment
  belongs_to :goods_owner
  belongs_to :endpoint, class_name: 'Address'
  belongs_to :startpoint, class_name: 'Address'
  validates :startpoint_id, presence: true
  validates :endpoint_id, presence: true
  validates :waybill_number,uniqueness: true
  validates :waybill_seria, uniqueness: true
end

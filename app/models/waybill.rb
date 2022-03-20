# frozen_string_literal: true

class Waybill < ApplicationRecord
  has_many :routes
  belongs_to :consignment
  belongs_to :goods_owner
end

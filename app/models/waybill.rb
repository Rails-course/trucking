class Waybill < ApplicationRecord
  has_many :routes
  has_one :consignment
end


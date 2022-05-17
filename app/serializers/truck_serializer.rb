class TruckSerializer < ActiveModel::Serializer
  attributes :id, :truck_number, :fuel_consumption
  belongs_to :truck_type
  belongs_to :company
end

class GoodSerializer < ActiveModel::Serializer
  attributes :id, :good_name, :quantity, :unit_of_measurement, :status
  belongs_to :consignment
end

class WarehouseSerializer < ActiveModel::Serializer
  attributes :id, :warehouse_name, :trusted
  belongs_to :address
  belongs_to :warehouseman, class_name: 'User'
  has_many :waybills
end

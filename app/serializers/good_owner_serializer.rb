class GoodOwnerSerializer < ActiveModel::Serializer
  attributes :id, :goods_owner_name
  belongs_to :address
end

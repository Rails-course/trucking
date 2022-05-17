class CheckpointSerializer < ActiveModel::Serializer
  attributes :id, :city, :pass_date, :is_passed
  belongs_to :waybill
end

class ConsignmentSerializer < ActiveModel::Serializer
  attributes :id, :bundle_seria, :bundle_number, :consignment_seria, :consignment_number, :status
  belongs_to :driver, class_name: 'User'
  belongs_to :dispatcher, class_name: 'User'
  belongs_to :manager, class_name: 'User'
  belongs_to :truck
  has_one :waybill, if: :waybill?
  has_many :write_off_acts
  has_many :goods

  def waybill?
    true if object.waybill
  end

  def waybill
    object.public_send('waybill') do |waybill|
      ::WaybilltSerializer.new(waybill).attributes
    end
  end
end

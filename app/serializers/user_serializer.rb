class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :second_name, :middle_name, :birthday, :login, :passport
  belongs_to :role
  belongs_to :company
  belongs_to :address
  has_many :driver_consignments, if: :driver?
  has_many :dispatcher_consignments, if: :dispatcher?
  has_many :manager_consignments, if: :manager?
  has_one :warehouse, if: :warehouseman?

  def warehouseman?
    object.role.role_name == 'warehouseman'
  end

  def driver?
    object.role.role_name == 'driver'
  end

  def dispatcher?
    object.role.role_name == 'dispatcher'
  end

  def manager?
    object.role.role_name == 'manager'
  end

  %w[driver dispatcher manager].each do |user|
    define_method("#{user}_consignments") do
      object.public_send("#{user}_consignments").map do |consignment|
        ::ConsignmentSerializer.new(consignment).attributes
      end
    end
  end
end

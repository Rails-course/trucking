# frozen_string_literal: true

class Consignment < ApplicationRecord
  belongs_to :driver, class_name: 'User'
  belongs_to :dispatcher, class_name: 'User', optional: true
  belongs_to :manager, class_name: 'User', optional: true
  belongs_to :truck
  belongs_to :waybill, optional: true
  has_one :write_off_act, dependent: :restrict_with_exception
  validates :status, inclusion: { in: %w[registered checked delivered] }
  validates :consignment_number, presence: true, numericality: { greater_than: 0 }
  validates :consignment_seria, presence: true, length: { in: 2..10 }
  validate :validate_user_roles
  before_save :upcase_bundle_consignment_seria

  private

  def upcase_bundle_consignment_seria
    self.consignment_seria = consignment_seria.upcase
    self.bundle_seria = bundle_seria.upcase
  end

  def validate_user_roles
    consignment_users = { driver: driver, dispatcher: dispatcher, manager: manager }
    consignment_users.each do |key, value|
      errors.add(key, 'user role is not valid') if value && value.role.role_name != key.to_s
    end
  end
end

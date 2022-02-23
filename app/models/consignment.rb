class Consignment < ApplicationRecord
  belongs_to :driver, class_name: 'User', optional: true
  belongs_to :dispatcher, class_name: 'User', optional: true
  belongs_to :manager, class_name: 'User', optional: true
  belongs_to :truck
  validates :status, inclusion: { in: %w[uncommited registered checked delivered] }
  validates :consignment_number, presence: true, numericality: { greater_than: 0 }
  validate :driver_role
  validate :dispatcher_role
  validate :manager_role
  before_create :set_registered_status

  private

  def driver_role
    if driver && driver.role != Role.find_by(role_name: 'driver')
      errors.add(:driver, 'user doesnt have driver role')
    end
  end

  def dispatcher_role
    if dispatcher && dispatcher.role != Role.find_by(role_name: 'dispatcher')
      errors.add(:dispatcher, 'user doesnt have dispatcher role')
    end
  end

  def manager_role
    if manager && manager.role != Role.find_by(role_name: 'manager')
      errors.add(:manager, 'user doesnt have manager role')
    end
  end

  def set_registered_status
    self.status = 'registered'
  end
end

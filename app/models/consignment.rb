class Consignment < ApplicationRecord
  belongs_to :user
  belongs_to :goods_owner
  belongs_to :destination
  belongs_to :truck
  validates :status, inclusion: { in: %w[accepted checked delivered] }
  validates :consignment_number, presence: true, numericality: { greater_than: 0 }
  validate :user_is_driver

  private

  def user_is_driver
    return unless user.role != Role.find_by(role_name: 'driver')

    errors.add(:user, 'should be driver')
  end
end

# frozen_string_literal: true

class Good < ApplicationRecord
  before_validation :set_accepted_status
  validates :good_name, presence: true, length: { in: 2..45 },
                        uniqueness: { scope: %i[bundle_seria bundle_number] }
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validates :unit_of_measurement, presence: true, length: { in: 2..15 }
  validates :status, presence: true, inclusion: { in: %w[accepted checked delivered lost] }
  validates :bundle_seria, presence: true, length: { in: 2..10 }
  validates :bundle_number, numericality: { greater_than: 0 }
  before_save :upcase_bundle_seria

  private

  def upcase_bundle_seria
    self.bundle_seria = bundle_seria.upcase
  end

  def set_accepted_status
    self.status = 'accepted'
  end
end

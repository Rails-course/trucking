# frozen_string_literal: true

class Good < ApplicationRecord
  before_create :upcase_bundle_seria
  validates :good_name, presence: true, length: { in: 2..45 }
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validates :unit_of_measurement, presence: true, length: { in: 2..15 }
  validates :status, presence: true, inclusion: { in: %w[accepted checked delivered lost] }
  validates :bundle_number, numericality: { greater_than: 0 }
  validates :bundle_seria, presence: true, length: { in: 2..10 }

  private

  def upcase_bundle_seria
    self.bundle_seria = bundle_seria.upcase
  end
end

# frozen_string_literal: true

class Company < ApplicationRecord
  has_many :users, dependent: :destroy
  validates :name, presence: true, length: { in: 3..30 }, uniqueness: true
  def change_status
    self.update(is_suspended: !self.is_suspended)
  end
end

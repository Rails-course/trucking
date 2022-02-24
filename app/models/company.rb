# frozen_string_literal: true

class Company < ApplicationRecord
  has_many :users, dependent: :destroy
  validates :name, presence: true, length: { in: 3..30 }, uniqueness: true
  def change_status
    update(is_suspended: !is_suspended)
  end
end

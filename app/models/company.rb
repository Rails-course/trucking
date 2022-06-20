# frozen_string_literal: true

class Company < ApplicationRecord
  audited

  has_many :users, dependent: :destroy
  has_many :trucks, dependent: :destroy
  validates :name, presence: true, length: { in: 3..30 }, uniqueness: true

  scope :by_name, ->(search) { where("name ilike '#{search}%'") }

  def change_status
    update(is_suspended: !is_suspended)
  end
end

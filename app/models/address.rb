# frozen_string_literal: true

class Address < ApplicationRecord
  has_many :users, dependent: :nullify
  has_many :destinations, dependent: :nullify
  has_many :goods_owners, dependent: :nullify
  validates :town, presence: true, length: { in: 3..30 }
  validates :street, presence: true, length: { in: 3..30 }
  validates :building, presence: true, numericality: { greater_than: 0 }
end

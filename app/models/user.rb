# frozen_string_literal: true

class User < ApplicationRecord
  belongs_to :role, optional: true
  belongs_to :company, optional: true
  validates :first_name, length: { in: 3..30 }
  validates :second_name, length: { in: 3..30 }
  validates :middle_name, length: { in: 3..30 }
  validates :login, presence: true, uniqueness: true, length: { in: 3..30 }
  validates_each :birthday do |record, attr, value|
    Date.parse(value.to_s)
  rescue StandardError
    record.errors.add(attr, 'Invalid date')
  end
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :timeoutable,
         :validatable
  belongs_to :company
end

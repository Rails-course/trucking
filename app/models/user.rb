# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :timeoutable,
         :validatable

  validates :email, presence: true, length: { minimum: 10, maximum: 100 }
  validates :password, presence: true, length: { minimum: 6, maximum: 100 }
end

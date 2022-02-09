# frozen_string_literal: true

class User < ApplicationRecord
  belongs_to :role, optional: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :timeoutable,
         :validatable
end

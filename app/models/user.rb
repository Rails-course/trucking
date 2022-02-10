# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :timeoutable,
         :validatable
  belongs_to :company
end

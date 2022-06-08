# frozen_string_literal: true

require 'audited/audit'

class TruckingAudit < Audited::Audit
  before_save :set_user_data

  def set_user_data
    user = ::Audited.store[:current_user].call
    if user
      self.user_id = user.id
      self.username = "#{user.first_name} #{user.second_name}"
      self.company_id = user.company_id
    end
  end

  scope :alphabetical_sort, lambda {
    order(username: :asc)
  }

  scope :search_name, lambda { |query|
    where('username ILIKE :query', query: "%#{query}%")
  }

  scope :search_action, lambda { |actions|
    where(action: actions)
  }

  scope :search_date, lambda { |start_date, end_date|
    start_date = Time.zone.parse(start_date).beginning_of_day
    end_date = Time.zone.parse(end_date).end_of_day
    where('created_at between ? and ?', start_date, end_date)
  }
end

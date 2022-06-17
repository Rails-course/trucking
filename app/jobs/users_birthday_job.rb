# frozen_string_literal: true

require 'sidekiq-scheduler'
require 'date'

class UsersBirthdayJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    # Rails.logger.debug User.where(birthday: '1992-02-22')
    User.where(birthday: Time.zone.today.to_date.beginning_of_day).find_each do |user|
      recipient_email = user&.email
      recipient_name = "#{user&.first_name} #{user&.middle_name} #{user&.second_name}"
      BirthdayMailer.birthday_email(recipient_email, recipient_name)
    end
  end
end

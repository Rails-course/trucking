# frozen_string_literal: true

require 'sidekiq-scheduler'
require 'date'

class UsersBirthdayJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    # Rails.logger.debug User.where(birthday: Time.zone.today.to_date.beginning_of_day)
    User.where(birthday: '1992-02-22').find_each do |user|
      p "Hi, user, #{user&.email} #{user&.first_name} #{user&.middle_name} #{user&.second_name}!"
      recipient_email = user&.email
      recipient_name = "#{user&.first_name} #{user&.middle_name} #{user&.second_name}"
      BirthdayMailer.send_email(recipient_email, recipient_name)
    end
  end
end

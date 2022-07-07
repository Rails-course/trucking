# frozen_string_literal: true

require 'sidekiq-scheduler'
require 'date'

class UsersBirthdayJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    # Rails.logger.debug User.where(birthday: '1992-02-22')
    User.where(
      "DATE_TRUNC('day', birthday) = DATE_TRUNC('day', CURRENT_DATE) AND
        DATE_TRUNC('month', birthday) = DATE_TRUNC('month', CURRENT_DATE)"
    ).find_each do |user|
      BirthdayMailer.birthday_email(user&.email, recipient_name(user))
    end

    # User.where(birthday: Date.today.beginning_of_day).find_each do |user|
    #   BirthdayMailer.birthday_email(user&.email, recipient_name(user))
    # end
  end
end

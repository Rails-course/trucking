# frozen_string_literal: true

require 'sidekiq-scheduler'
require 'date'

class BirthdayMailerJob < ApplicationJob
  queue_as :mailers

  def perform(*_args)
    User.where(
      "DATE_TRUNC('day', birthday) = DATE_TRUNC('day', CURRENT_DATE) AND
        DATE_TRUNC('month', birthday) = DATE_TRUNC('month', CURRENT_DATE)"
    ).find_each do |user|
      BirthdayMailer.birthday_email(user.email, recipient_name(user)).deliver
    end
  end
end

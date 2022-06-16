# frozen_string_literal: true

# require 'sidekiq-scheduler'
require 'date'

class UsersBirthdayJob < ApplicationJob
  queue_as :default

  def perform(user_params)
    print user_params
    # User.where(birthday: user&.birthday && birthday.to_date.beginning_of_day).find_each do |user|
    #   print 'Hi, user!'
    #   recipient_email = user&.email
    #   recipient_name = "#{user&.first_name} #{user&.middle_name} #{user&.second_name}"
    #   BirthdayMailer.send_email(recipient_email, recipient_name)
    # end
  end
end

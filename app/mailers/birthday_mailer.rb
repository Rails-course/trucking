# frozen_string_literal: true

class BirthdayMailer < ApplicationMailer
  default from: ENV['GMAIL_USERNAME']


  def recipient_name(user)
    "#{user.first_name} #{user.middle_name} #{user.second_name}" if user
  end

  def birthday_email(recipient_email, name)
    @user_name = name
    mail(to: recipient_email, subject: 'Happy Birthday!')
  end
end

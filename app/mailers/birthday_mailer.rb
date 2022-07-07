# frozen_string_literal: true

class BirthdayMailer < ApplicationMailer
  default from: ENV['GMAIL_USERNAME']


  def recipient_name(user)
    self.username = "#{user.first_name} #{user.middle_name} #{user.second_name}" if user
  end

  def birthday_email(recipient_email, recipient_name)
    @user_name = recipient_name
    mail(to: recipient_email, subject: 'Happy Birthday!')
  end
end

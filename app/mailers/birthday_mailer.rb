# frozen_string_literal: true

class BirthdayMailer < ApplicationMailer
  default from: ENV['GMAIL_USERNAME']

  def send_email(recipient_email, recipient_name)
    p 'Cool!'
    mail(to: recipient_email, subject: 'Happy Birthday!', name: recipient_name)
  end
end

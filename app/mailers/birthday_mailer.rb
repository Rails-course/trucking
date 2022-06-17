# frozen_string_literal: true

class BirthdayMailer < ApplicationMailer
  default from: ENV['GMAIL_USERNAME']

  def birthday_email(recipient_email, recipient_name)
    mail(to: recipient_email, subject: 'Happy Birthday!', name: recipient_name) do |format|
      format.html { render 'birthday_mailer/birthday_email' }
    end
  end
end

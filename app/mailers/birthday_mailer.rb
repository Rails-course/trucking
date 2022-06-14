class BirthdayMailer < ApplicationMailer
  def contact(recipient, subject, message, sent_at = Time.now)
    @subject = subject
    @recipients = recipient
    @from = 'no-reply@yourdomain.com'
    @sent_on = sent_at
    @body["title"] = 'Birthday'
    @body["email"] = 'sender@yourdomain.com'
    @body["message"] = message
    @headers = {}
  end
end

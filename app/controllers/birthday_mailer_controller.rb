class BirthdayMailerController < ApplicationController
  def index
    render :file => 'birthday_mailer/index.html.erb'
  end

  def sendmail
    recipient = params[:email]
    subject = params[:subject]
    message = params[:message]
    BirthdayMailer.contact(recipient, subject, message)
    return if request.xhr?
    render :text => 'Message sent successfully'
  end


end

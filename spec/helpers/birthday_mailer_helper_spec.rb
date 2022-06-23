require 'rails_helper'

class BirthdayMailerTest < ActionMailer::TestCase
  test "birthday" do
    # Создайте email и сохраните его для будущих утверждений
    email = BirthdayMailer.birthday_email("friend@example.com", "Ivan Ivanovich Ivanov")

    # Отправить письмо, затем проверить, что оно попало в очередь
    assert_emails 1 do
      email.deliver_now
    end

    # Проверить тело отправленного письма, что оно содержит то, что мы ожидаем
    assert_equal ["trucking.app.reset@gmail.com"], email.from
    assert_equal ["friend@example.com"], email.to
    assert_equal "You have birthday email from trucking.app.reset@gmail.com", email.subject
    assert_equal read_fixture("birthday").join, email.body.to_s
  end
end

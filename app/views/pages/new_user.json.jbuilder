# frozen_string_literal: true

json.array! @users do |user|
  json.id user.id
  json.firstName user.first_name
  json.middleName user.middle_name
  json.secondName user.second_name
  json.login user.login
  json.roleName user.role
end

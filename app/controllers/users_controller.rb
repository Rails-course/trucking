# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users_data=[['PAvel','asd'],['asd','asd']]
    User.all.each { |user|
    @users_data[0].append(user.name)
    @users_data[1].append('user.company')}
  end
end

# frozen_string_literal: true

class Company < ApplicationRecord
  def change_status
    self.update(is_suspended: !self.is_suspended)
  end
end

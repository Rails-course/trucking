# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Role, type: :model do
  subject { create(:role) }

  context 'When credentials are not correct' do
    it 'role name should not be valid (blank)' do
      subject.role_name = ''
      expect(subject).to_not be_valid
    end

    it 'role name length should not be valid (<3)' do
      subject.role_name = 'fo'
      expect(subject).to_not be_valid
    end

    it 'role name length should not be valid (>15)' do
      subject.role_name = 'foobar' * 4
      expect(subject).to_not be_valid
    end

    it 'role_name should not be valid (not unique)' do
      role = build(:role, role_name: subject.role_name)
      expect(role).to_not be_valid
    end
  end

  context 'When credentials are correct' do
    it 'should be valid' do
      expect(subject).to be_valid
    end
  end
end

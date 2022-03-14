require 'rails_helper'

RSpec.describe Route, type: :model do
  subject { create(:route) }

  context 'invalid data to routes' do
    it 'route name should not be blank' do
      subject.city = ''
      expect(subject).to_not be_valid
    end
  end
  context 'valid data to routes' do
    it 'route should be valid' do
      expect(subject).to be_valid
    end
  end
end

require 'rails_helper'

RSpec.describe Destination, type: :model do
  subject { create(:destination) }

  context 'When credentials are not correct' do
    it 'destination name should not be valid (blank)' do
      subject.destination_name = ''
      expect(subject).to_not be_valid
    end

    it 'destination name length should not be valid (<3)' do
      subject.destination_name = 'fo'
      expect(subject).to_not be_valid
    end

    it 'destination name length should not be valid (>30)' do
      subject.destination_name = 'foobar' * 6
      expect(subject).to_not be_valid
    end

    it 'destination name should not be valid (not unique)' do
      destination = build(:destination, destination_name: subject.destination_name)
      expect(destination).to_not be_valid
    end
  end

  context 'When credentials are correct' do
    it 'destination should be valid' do
      expect(subject).to be_valid
    end
  end
end

require 'rails_helper'

RSpec.describe Company, type: :model do
  subject = build(:company)
  it 'should create Company' do
    expect(subject.save).to eq(true)
  end
  it 'shouldn\'t create Company with < 3 chars name' do
    subject.name = 'er'
    expect(subject.save).to eq(false)
  end
  it 'shouldn\'t create Company with > 30 chars name' do
    subject.name = 'a' * 31
    expect(subject.save).to eq(false)
  end
  it 'shouldn\'t create Company with empty name' do
    subject.name = ''
    expect(subject.save).to eq(false)
  end
end

require 'rails_helper'

RSpec.describe Company, type: :model do

  it 'should create Company' do
    subject { build(:company) }
    subject.name = 'Company'
    expect(subject.save).to eq(true)
  end
  it 'shouldn\'t create Company with < 3 chars name' do
    subject { build(:company) }
    subject.name = 'er'
    expect(subject.save).to eq(false)
  end
  it 'shouldn\'t create Company with > 30 chars name' do
    subject { build(:company) }
    subject.name = 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest'
    expect(subject.save).to eq(false)
  end
  it 'shouldn\'t create Company with empty name' do
    subject { build(:company) }
    subject.name = ''
    expect(subject.save).to eq(false)
  end
end

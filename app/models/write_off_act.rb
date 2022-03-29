# frozen_string_literal: true

class WriteOffAct < ApplicationRecord
  belongs_to :consignment
  validates :good_name, presence: true, length: { in: 2..45 }
  validates :lost_quantity, presence: true, numericality: { greater_than: 0 }
  validates :description, allow_blank: true, length: { in: 2..255 }
  validate :good_name_and_quantity

  private

  def good_name_and_quantity
    consignment_goods_names = Good.select(:good_name)
                                  .where(bundle_seria: consignment.bundle_seria,
                                         bundle_number: consignment.bundle_number)
                                  .collect(&:good_name)

    if consignment_goods_names.include?(good_name)
      item = Good.where(bundle_seria: consignment.bundle_seria,
                        bundle_number: consignment.bundle_number,
                        good_name: good_name)
                 .first

      errors.add(:quantity, 'of lost items is invalid') if lost_quantity > item.quantity
    else
      errors.add(:good_name, 'is not in bundle for this consignment')
    end
  end
end

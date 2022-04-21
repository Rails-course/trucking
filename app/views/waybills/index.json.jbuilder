# frozen_string_literal: true

json.array! @data do |waybill|
  json.id waybill[:id]
  json.startpoint waybill[:startpoint]
  json.endpoint waybill[:endpoint]
  json.status waybill[:status]
  json.waybill_seria waybill[:waybill_seria]
  json.waybill_number waybill[:waybill_number]
end

# frozen_string_literal: true

json.array! @data do |waybill|
  json.id waybill[:id]
  json.startpoint waybill[:startpoint]
  json.endpoint waybill[:endpoint]
  json.status waybill[:status]
  json.seria waybill[:seria]
  json.number waybill[:number]
end

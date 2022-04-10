# frozen_string_literal: true

json.array! @waybills do |waybill|
  json.id waybill[:id]
  json.startpoint waybill[:startpoint]
  json.endpoint waybill[:endpoint]
  json.status waybill[:status]
end

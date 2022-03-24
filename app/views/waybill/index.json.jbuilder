json.array! @data do |waybill|
  json.id waybill[:id]
  json.startpoint waybill[:startpoint]
  json.endpoint waybill[:endpoint]
  json.status waybill[:status]
end

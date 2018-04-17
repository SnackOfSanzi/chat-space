if @new_messages.present?
  json.array! @new_messages do |message|
  json.body          message.body
  json.image         message.image
  json.id            message.id
  json.name          message.user.name
  json.created_at  message.time_formats
end

end

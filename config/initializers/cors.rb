Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://trucking-logistics.herokuapp.com/'
    resource('*', headers: :any, methods: :any)
  end
  allow do
    origins '*'
    resource('*', headers: :any, expose: ['Authorization'], methods: %i[get post])
  end
end

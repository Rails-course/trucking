# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
roles = Role.create([{ role_name: 'dispatcher' }, { role_name: 'owner' }, { role_name: 'driver' },
                     { role_name: 'manager' }, { role_name: 'system administrator' }])
truck_types = TruckType.create([{ truck_type_name: 'covered body' },
                                { truck_type_name: 'refrigerator' }, { truck_type_name: 'cistern' }])

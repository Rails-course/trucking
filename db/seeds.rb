# Roles
roles = Role.create([{ role_name: 'dispatcher' }, { role_name: 'owner' }, { role_name: 'driver' },
                     { role_name: 'manager' }, { role_name: 'admin' } { role_name: 'system administrator' }])
# Truck types
truck_types = TruckType.create([{ truck_type_name: 'covered body' },
                                { truck_type_name: 'refrigerator' }, { truck_type_name: 'cistern' }])
# Companies
companies = Company.create([{ name: 'IBM' }, { name: 'Trade power' }]
# System admin
sysAdmin = User.create( 
  email: 'sysadmin@example.com',
  password: 'sysadmin123',
  first_name: 'sysAdmin',
  second_name: 'sysAdminov',
  middle_name: 'sysAdminovich',
  birthday: Date.parse('01/01/1970'),
  login: 'sysAdmin',
  role: Role.find_by(role_name: 'system administrator'),
  address: Address.new(town: 'Homel', street: 'Platonova', building: 50))
# IBM trucks
IBM_trucks = Truck.create([{ fuel_consumption: 33.33, truck_number: 667455, truck_type: TruckType.find_by(truck_type_name: 'covered body') },
                           { fuel_consumption: 17.74, truck_number: 133788,
                             truck_type: TruckType.find_by(truck_type_name: 'covered body') }])
# IBM users
IBM_admin = User.create(
  email: 'ibmadmin@example.com',
  password: 'ibmadmin123',
  first_name: 'Kirill',
  second_name: 'Kirillov',
  middle_name: 'Kirillovich',
  birthday: Date.parse('13/11/1996'),
  login: 'IBMAdmin',
  role: Role.find_by(role_name: 'admin'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 77, apartment: 45),
  company: Company.find_by(name: 'IBM')
)
IBM_owner = User.create(
  email: 'ibmowner@example.com',
  password: 'Ibmowner123',
  first_name: 'Petr',
  second_name: 'Petrov',
  middle_name: 'Petrovich',
  birthday: Date.parse('01/01/2000'),
  login: 'IBMOwner',
  role: Role.find_by(role_name: 'owner'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 55, apartment: 4),
  company: Company.find_by(name: 'IBM')
)
IBM_dispatcher = User.create(
  email: 'ibmdispatcher@example.com',
  password: 'ibmdispatcher123',
  first_name: 'Ivan',
  second_name: 'Ivanov',
  middle_name: 'Ivanovich',
  birthday: Date.parse('02/02/2002'),
  login: 'IBMDispatcher',
  role: Role.find_by(role_name: 'dispatcher'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 60, apartment: 6),
  company: Company.find_by(name: 'IBM')
)
IBM_manager = User.create(
  email: 'ibmmanager@example.com',
  password: 'ibmmanager123',
  first_name: 'Dmitriy',
  second_name: 'Dmitrov',
  middle_name: 'Dmitrievich',
  birthday: Date.parse('03/03/2003'),
  login: 'IBMManager',
  role: Role.find_by(role_name: 'manager'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 13, apartment: 3),
  company: Company.find_by(name: 'IBM')
)
IBM_driver = User.create(
  email: 'ibmdriver@example.com',
  password: 'ibmdriver123',
  first_name: 'Alex',
  second_name: 'Alexov',
  middle_name: 'Alexeevich',
  birthday: Date.parse('04/04/2004'),
  login: 'IBMDriver',
  role: Role.find_by(role_name: 'driver'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 14, apartment: 41),
  company: Company.find_by(name: 'IBM')
)
# Trade power trucks
Tradep_trucks = Truck.create([{ fuel_consumption: 25.03, truck_number: 739174, truck_type: TruckType.find_by(truck_type_name: 'refrigerator') },
                              { fuel_consumption: 13.50, truck_number: 734517,
                                truck_type: TruckType.find_by(truck_type_name: 'cistern') }])
# Trade power users
Tradep_admin = User.create(
  email: 'tradepadmin@example.com',
  password: 'tradepadmin123',
  first_name: 'Albert',
  second_name: 'Albertov',
  middle_name: 'Albertovich',
  birthday: Date.parse('26/10/1997'),
  login: 'TradepAdmin',
  role: Role.find_by(role_name: 'admin'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 113, apartment: 74),
  company: Company.find_by(name: 'Trade power')
)
Tradep_owner = User.create(
  email: 'tradepowner@example.com',
  password: 'tradepowner123',
  first_name: 'Nikita',
  second_name: 'Nikitin',
  middle_name: 'Nikitovich',
  birthday: Date.parse('22/02/1992'),
  login: 'TradepOwner',
  role: Role.find_by(role_name: 'owner'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 33, apartment: 22),
  company: Company.find_by(name: 'Trade power')
)
TradeP_dispatcher = User.create(
  email: 'tradepdispatcher@example.com',
  password: 'tradepdispatcher123',
  first_name: 'Anton',
  second_name: 'Antonov',
  middle_name: 'Antonovich',
  birthday: Date.parse('17/05/1998'),
  login: 'TradepDispatcher',
  role: Role.find_by(role_name: 'dispatcher'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 66, apartment: 102),
  company: Company.find_by(name: 'Trade power')
)
TradeP_manager = User.create(
  email: 'tradepmanager@example.com',
  password: 'tradepmanager123',
  first_name: 'Max',
  second_name: 'Maximov',
  middle_name: 'Maximovich',
  birthday: Date.parse('22/02/1992'),
  login: 'TradepManager',
  role: Role.find_by(role_name: 'manager'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 107, apartment: 3),
  company: Company.find_by(name: 'Trade power')
)
TradeP_driver = User.create(
  email: 'tradepdriver@example.com',
  password: 'tradepdriver123',
  first_name: 'Artem',
  second_name: 'Artemov',
  middle_name: 'Artemovich',
  birthday: Date.parse('07/07/2002'),
  login: 'TradepDriver',
  role: Role.find_by(role_name: 'driver'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 77, apartment: 8),
  company: Company.find_by(name: 'Trade power')
)

# Destination points
Grocery_store = Destination.create(destination_name: 'Grocery store', address: Address.new(town: 'Homel', street: 'Sovetskaya', building 60))
Shopping_center = Destination.create(destination_name: 'Almi', address: Address.new(town: 'Homel', street: 'Mazurova', building 79))
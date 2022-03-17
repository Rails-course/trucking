# Roles
roles = Role.create([{ role_name: 'dispatcher' }, { role_name: 'owner' }, { role_name: 'driver' },
                     { role_name: 'manager' }, { role_name: 'admin' }, { role_name: 'system administrator' }])
# Truck types
truck_types = TruckType.create([{ truck_type_name: 'covered body' },
                                { truck_type_name: 'refrigerator' }, { truck_type_name: 'cistern' }])
# Companies
companies = Company.create([{ name: 'jetlogistic' }, { name: 'gruzimvse' }])
# System admin
sys_Admin = User.create(
  email: 'sysadmin@example.com',
  password: 'sysadmin123',
  first_name: 'sysAdmin',
  second_name: 'sysAdminov',
  middle_name: 'sysAdminovich',
  birthday: Date.parse('01/01/1970'),
  passport: '11337218, issued by the police department of the Centralniy district of Homel',
  login: 'sysAdmin',
  role: Role.find_by(role_name: 'system administrator'),
  address: Address.new(town: 'Homel', street: 'Platonova', building: 43, apartment: 83)
)
# jetlogistic trucks
jetlogistic_trucks = Truck.create([
                                    { fuel_consumption: 33.33, truck_number: 'MAN 32-66 BY',
                                      truck_type: TruckType.find_by(truck_type_name: 'covered body'), company: Company.find_by(name: 'jetlogistic') },
                                    { fuel_consumption: 17.74, truck_number: 'МАЗ 13-33 BY',
                                      truck_type: TruckType.find_by(truck_type_name: 'covered body'), company: Company.find_by(name: 'jetlogistic') }
                                  ])
# jetlogistic users
jetlogistic_admin = User.create(
  email: 'jetlogisticadmin@example.com',
  password: 'jetlogisticadmin123',
  first_name: 'Kirill',
  second_name: 'Kirillov',
  middle_name: 'Kirillovich',
  birthday: Date.parse('13/11/1996'),
  passport: '18231873, issued by the police department of the Centralniy district of Homel',
  login: 'jetlogisticAdmin',
  role: Role.find_by(role_name: 'admin'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 77, apartment: 45),
  company: Company.find_by(name: 'jetlogistic')
)
jetlogistic_owner = User.create(
  email: 'jetlogisticowner@example.com',
  password: 'jetlogisticowner123',
  first_name: 'Petr',
  second_name: 'Petrov',
  middle_name: 'Petrovich',
  birthday: Date.parse('01/01/2000'),
  passport: '44454874, issued by the police department of the Centralniy district of Homel',
  login: 'jetlogisticOwner',
  role: Role.find_by(role_name: 'owner'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 55, apartment: 4),
  company: Company.find_by(name: 'jetlogistic')
)
jetlogistic_dispatcher = User.create(
  email: 'jetlogisticdispatcher@example.com',
  password: 'jetlogisticdispatcher123',
  first_name: 'Ivan',
  second_name: 'Ivanov',
  middle_name: 'Ivanovich',
  birthday: Date.parse('02/02/2002'),
  passport: '90914112, issued by the police department of the Centralniy district of Homel',
  login: 'jetlogisticDispatcher',
  role: Role.find_by(role_name: 'dispatcher'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 60, apartment: 6),
  company: Company.find_by(name: 'jetlogistic')
)
jetlogistic_manager = User.create(
  email: 'jetlogisticmanager@example.com',
  password: 'jetlogisticmanager123',
  first_name: 'Dmitriy',
  second_name: 'Dmitrov',
  middle_name: 'Dmitrievich',
  birthday: Date.parse('03/03/2003'),
  passport: '47111504, issued by the police department of the Centralniy district of Homel',
  login: 'jetlogisticManager',
  role: Role.find_by(role_name: 'manager'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 13, apartment: 3),
  company: Company.find_by(name: 'jetlogistic')
)
jetlogistic_driver = User.create(
  email: 'jetlogisticdriver@example.com',
  password: 'jetlogisticdriver123',
  first_name: 'Alex',
  second_name: 'Alexov',
  middle_name: 'Alexeevich',
  birthday: Date.parse('04/04/2004'),
  passport: '84485967, issued by the police department of the Centralniy district of Homel',
  login: 'jetlogisticDriver',
  role: Role.find_by(role_name: 'driver'),
  address: Address.new(town: 'Homel', street: 'Sovetskaya', building: 14, apartment: 41),
  company: Company.find_by(name: 'jetlogistic')
)
# gruzimvse trucks
gruzimvse_trucks = Truck.create([
                                  { fuel_consumption: 25.03, truck_number: 'MAN 07-81 BY',
                                    truck_type: TruckType.find_by(truck_type_name: 'refrigerator'), company: Company.find_by(name: 'gruzimvse') },
                                  { fuel_consumption: 13.50, truck_number: 'МАЗ 51-44 BY',
                                    truck_type: TruckType.find_by(truck_type_name: 'cistern'), company: Company.find_by(name: 'gruzimvse') }
                                ])
# gruzimvse users
gruzimvse_admin = User.create(
  email: 'gruzimvseadmin@example.com',
  password: 'gruzimvseadmin123',
  first_name: 'Albert',
  second_name: 'Albertov',
  middle_name: 'Albertovich',
  birthday: Date.parse('26/10/1997'),
  passport: '79423065, issued by the police department of the Centralniy district of Homel',
  login: 'gruzimvseAdmin',
  role: Role.find_by(role_name: 'admin'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 113, apartment: 74),
  company: Company.find_by(name: 'gruzimvse')
)
gruzimvse_owner = User.create(
  email: 'gruzimvseowner@example.com',
  password: 'gruzimvseowner123',
  first_name: 'Nikita',
  second_name: 'Nikitin',
  middle_name: 'Nikitovich',
  birthday: Date.parse('22/02/1992'),
  passport: '90952744, issued by the police department of the Centralniy district of Homel',
  login: 'gruzimvseOwner',
  role: Role.find_by(role_name: 'owner'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 33, apartment: 22),
  company: Company.find_by(name: 'gruzimvse')
)
gruzimvse_dispatcher = User.create(
  email: 'gruzimvsedispatcher@example.com',
  password: 'gruzimvsedispatcher123',
  first_name: 'Anton',
  second_name: 'Antonov',
  middle_name: 'Antonovich',
  birthday: Date.parse('17/05/1998'),
  passport: '64746245, issued by the police department of the Centralniy district of Homel',
  login: 'gruzimvseDispatcher',
  role: Role.find_by(role_name: 'dispatcher'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 66, apartment: 102),
  company: Company.find_by(name: 'gruzimvse')
)
gruzimvse_manager = User.create(
  email: 'gruzimvsemanager@example.com',
  password: 'gruzimvsemanager123',
  first_name: 'Max',
  second_name: 'Maximov',
  middle_name: 'Maximovich',
  birthday: Date.parse('22/02/1992'),
  passport: '86199183, issued by the police department of the Centralniy district of Homel',
  login: 'gruzimvseManager',
  role: Role.find_by(role_name: 'manager'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 107, apartment: 3),
  company: Company.find_by(name: 'gruzimvse')
)
gruzimvse_driver = User.create(
  email: 'gruzimvsedriver@example.com',
  password: 'gruzimvse123',
  first_name: 'Artem',
  second_name: 'Artemov',
  middle_name: 'Artemovich',
  birthday: Date.parse('07/07/2002'),
  passport: '70006831, issued by the police department of the Centralniy district of Homel',
  login: 'gruzimvseDriver',
  role: Role.find_by(role_name: 'driver'),
  address: Address.new(town: 'Homel', street: 'Pravdi', building: 77, apartment: 8),
  company: Company.find_by(name: 'gruzimvse')
)

# Goods owners
jetlogistic_goods_owner = GoodsOwner.create(warehouse_name: 'IBM',
                                            address: Address.new(
                                              town: 'Homel', street: 'Proletarskaya', building: 77, apartment: 1
                                            ))
gruzimvseower_goods_owner = GoodsOwner.create(warehouse_name: 'Trade power',
                                              address: Address.new(
                                                town: 'Homel', street: 'Proletarskaya', building: 71, apartment: 1
                                              ))

# Warehouses
Grocery_store = Warehouse.create(
  warehouse_name: 'Grocery store', address: Address.new(town: 'Homel', street: 'Sovetskaya',
                                                        building: 60, apartment: 1), trusted: false
)
Shopping_center = Warehouse.create(
  warehouse_name: 'Almi', address: Address.new(town: 'Homel', street: 'Mazurova', building: 79,
                                               apartment: 1), trusted: true
)

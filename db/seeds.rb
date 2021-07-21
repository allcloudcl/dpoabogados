# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# ROLES
# -----


# USERS
# -----
user = User.create!({
  first_name: "Regular",
  last_name: "User",
  email: "user@mail.com",
  username: 'normal',
  dni: "12.345.678-9",
  password: "123456",
  password_confirmation: "123456"
})
admin = User.create!({
  first_name: "Admin",
  last_name: "AllCloud",
  email: "admin@mail.com",
  username: 'admin',
  dni: "01.234.567-K",
  password: "123456",
  password_confirmation: "123456"
})


# CONTRACTS
# ---------
Contract.create!([
  {
    description: "Contrato Deuda para Usuario. Lorem ipsum etc etc",
    kind: 0,
    user_id: user.id,
    creditor: "AllCloud",
    amount: "130000.00",
    dues: "12",
    grace_months: 0,
    payment: "10000",
    value_fee: "12000",
    payday: Date.new.strftime("%m/%d/%Y"),
  },
  {
    description: "Contrato Deuda para Admin. Lorem ipsum etc etc",
    kind: 0,
    user_id: admin.id,
    creditor: "AllCloud",
    amount: "130000.00",
    dues: "12",
    grace_months: 0,
    payment: "10000",
    value_fee: "12000",
    payday: Date.new.strftime("%m/%d/%Y"),
  },
  {
    description: "Contrato Jurídico para Usuario. Lorem ipsum etc etc",
    kind: 1,
    user_id: user.id,
    creditor: "AllCloud",
    amount: "130000.00",
    dues: "12",
    grace_months: 0,
    payment: "10000",
    value_fee: "12000",
    payday: Date.new.strftime("%m/%d/%Y"),
  },
  {
    description: "Contrato Jurídico para Admin. Lorem ipsum etc etc",
    kind: 1,
    user_id: admin.id,
    creditor: "AllCloud",
    amount: "130000.00",
    dues: "12",
    grace_months: 1,
    payment: "10000",
    value_fee: "12000",
    payday: Date.new.strftime("%m/%d/%Y"),
  }
])

# ENTRIES
# #######
5.times.each do |i|
  Contract.first.entries.create!({details: "#{i.ordinalize} Entry", author_id: admin.id})
end

# SCHEDULES
# #########
10.times.each do |i|
  date = DateTime.now + rand(-2..2).round(1) - rand(0..0.3).round(2)
  Calendar.find(rand(1..2)).schedules.create!(
    {
      title: "#{i.ordinalize} Schedule",
      body: "Lorem ipsum",
      start: date,
      end: date + rand(0..0.3).round(2),
    }
  )
end

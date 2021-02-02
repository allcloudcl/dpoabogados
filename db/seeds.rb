# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# ROLES
# -----
normal_role = Role.create!({name: 'normal'})
admin_role = Role.create!({name: 'admin'})


# USERS
# -----
user = User.create!({first_name: "Regular", last_name: "User", email: "user@mail.com", username: 'normal', role: normal_role, password: "123456", password_confirmation: "123456"})
admin = User.create!({first_name: "Admin", last_name: "ChileDeuda", email: "admin@mail.com", username: 'admin', role: admin_role, password: "123456", password_confirmation: "123456"})

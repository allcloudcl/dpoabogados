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
user = User.create!({email: "user@mail.com", role: normal_role, password: "123456", password_confirmation: "123456"})
admin = User.create!({email: "admin@mail.com", role: admin_role, password: "123456", password_confirmation: "123456"})

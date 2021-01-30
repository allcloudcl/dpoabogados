class Role < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :users, dependent: :restrict_with_exception
end

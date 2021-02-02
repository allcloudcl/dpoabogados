class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  ## Validations
  validates :username, presence: true, uniqueness: {case_sensitive: false}
  # only allow letter, number, underscore and punctuation.
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true

  ## Relationships
  belongs_to :role
  has_many :contracts

  def admin?
    /admin/i.match?(role.name)
  end

  attr_writer :login
  def login
    @login || self.username || self.email
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value", {:value => login.downcase}]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      conditions[:email].downcase! if conditions[:email]
      where(conditions.to_h).first
    end
  end
end

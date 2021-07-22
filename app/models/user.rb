class User < ApplicationRecord
  rolify :before_add => :remove_previous_roles
  acts_as_token_authenticatable

  after_create :assign_default_role

  before_create :build_default_calendar

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  ## Validations
  validates :username, uniqueness: {case_sensitive: false}
  # only allow letter, number, underscore and punctuation.
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true
  # Validate DNI. Follows the pattern XX.XXX.XXX-Y
  validates :dni, format: {with: /\A\d{2}\.\d{3}\.\d{3}-(\d|k)\z/i, message: "Wrong DNI format. It must look like XX.XXX.XXX-Y"}

  ## Associations
  has_many :contracts
  has_many :entries, foreign_key: 'author_id'
  has_one :calendar
  has_and_belongs_to_many :schedules, foreign_key: :attendee_id, join_table: "attendees_schedules"
  # has_and_belongs_to_many :schedules, foreign_key: :attendee_id, association_foreign_key: :schedule_id, join_table: "attendees_schedules"


  def full_name
    "#{first_name} #{last_name}"
  end

  # Used by devise
  attr_writer :login
  def login
    @login || self.username || self.email
  end

  # This class method is used by devise and is used when the users logs in,
  # using either their username or their email, this method checks both
  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value", {:value => login.downcase}]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      conditions[:email].downcase! if conditions[:email]
      where(conditions.to_h).first
    end
  end


  # We want to have only one role at a time
  def remove_previous_roles(role_name)
    self.roles.delete_all
  end

  def assign_default_role
    self.add_role(:client) if self.roles.blank?
  end

  private
  # https://stackoverflow.com/a/3809360/8872343
  def build_default_calendar
    build_calendar
    true
  end
end

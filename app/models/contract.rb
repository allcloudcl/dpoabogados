class Contract < ApplicationRecord
  belongs_to :user
  has_many :entries

  # Validations
  validates :grace_months, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 4 }
  validates :amount, numericality: { greater_than_or_equal_to: 0 }
  validates :dues, numericality: { greater_than_or_equal_to: 1 }
  validates :payment, numericality: { greater_than_or_equal_to: 0 }
  validates :value_fee, numericality: { greater_than_or_equal_to: 0 }

  # Two types of contracts: Deuda, and Jurídico
  enum kind: [:deuda, :legal], _prefix: :kind

  # search[:dni]
  # search[:description]
  # search[:kind]
  def self.search(query)
    contracts = Contract.joins(:user)
    contracts = contracts.where("dni like ?", "%#{query[:dni]}%") if query[:dni].present?
    contracts = contracts.where("description like ?", "%#{query[:description]}%") if query[:description].present?
    contracts = contracts.where(kind: query[:kind]) if query[:kind].present?
    contracts
  end
end

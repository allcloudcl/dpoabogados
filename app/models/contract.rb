class Contract < ApplicationRecord
  belongs_to :user
  has_many :entries

  # Two types of contracts: Deuda, and Jurídico
  enum kind: [:deuda, :legal], _prefix: :kind
end

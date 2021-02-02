class Contract < ApplicationRecord
  belongs_to :user

  # Two types of contracts: Deuda, and Jurídico
  enum kind: [:debt, :legal], _prefix: :contract
end

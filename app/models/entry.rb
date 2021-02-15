class Entry < ApplicationRecord
  belongs_to :contract
  belongs_to :author, class_name: 'User'

  has_one_attached :document
end

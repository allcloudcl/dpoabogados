class Entry < ApplicationRecord
  belongs_to :contract
  belongs_to :author, class_name: 'User'
end

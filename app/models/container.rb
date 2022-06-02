class Container < ApplicationRecord
    validates :body, presence: true
end

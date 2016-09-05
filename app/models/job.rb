class Job < ActiveRecord::Base
  belongs_to :user
  has_many :time_entries
end

FactoryGirl.define do
  factory :time_entry do
    sequence(:time_spent) { i * 100 }
    sequence(:date) { |n| n.days.ago.utc.iso8601 }
    sequence(:summary) { |i| "Summary #{i}" }
    job
  end
end

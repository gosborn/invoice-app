FactoryGirl.define do
  factory :job do
    user
    sequence(:title) { |i| "Job #{i}" }
    sequence(:hourly_rate) { i }
    sequence(:tax_rate) { i }
  end
end

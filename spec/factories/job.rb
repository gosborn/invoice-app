FactoryGirl.define do
  factory :job do
    user
    sequence(:title) { |i| "Job #{i}" }
    sequence(:hourly_rate) { |i| i * 10.0 }
    sequence(:tax_rate) { |i| i * 2.0 }
  end
end

require 'rails_helper'

RSpec.describe InvoiceGenerator, type: :model do
  let(:user) { FactoryGirl.create(:user) }
  let(:job) do 
    FactoryGirl.create(
      :job,
      user: user,
      hourly_rate: 100,
      tax_rate: 2
    )
  end

  let!(:time_entry_1) do
    FactoryGirl.create(
      :time_entry,
      date: '11/10/2016',
      job: job,
      summary: 'a job',
      time_spent: 100.0
    )
  end

  let!(:time_entry_2) do
    FactoryGirl.create(
      :time_entry,
      date: '15/10/2016',
      job: job,
      summary: 'a different job',
      time_spent: 200.0
    )
  end

  let(:params) do
    {
      job: job,
      end_date: end_date,
      start_date: start_date
    }
  end

  let(:start_date) { '01/10/2016' }
  let(:end_date) { '16/10/2016' }

  let(:invoice_generator) do
    InvoiceGenerator.new(params)
  end

  describe 'invoice' do
    example do 
      expect(invoice_generator.invoice).to eql(
        {
          job: job.title,
          date_range: 'October 01, 2016 - October 16, 2016',
          hourly_rate: '$100.00',
          sub_total: '$500.00',
          tax_rate: 2.0,
          tax: '$10.00',
          total: '$510.00',
          total_minutes: 300,
          time_entries: [
            {
              date: '2016-10-15',
              summary: 'a different job',
              time_spent: 200
            },
            {
              date: '2016-10-11',
              summary: 'a job',
              time_spent: 100
            }
          ]
        }
      )
    end
  end
end

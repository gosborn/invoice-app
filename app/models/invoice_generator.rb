require 'action_view'

class InvoiceGenerator
  include ActionView::Helpers::NumberHelper

  def initialize(args)
    @start_date = args[:start_date]
    @end_date = args[:end_date]
    @job = Job.find(args[:job_id])
  end

  def invoice
    {
      job: @job.title,
      date_range: date_range,
      sub_total: money_format(sub_total),
      tax: money_format(tax),
      total: money_format(total),
      time_entries: formatted_time_entries
    }
  end

  def time_entries
    @time_entries ||= @job.time_entries.where(date: Date.parse(@start_date)..Date.parse(@end_date))
  end

  private

  def date_range
    "#{Date.parse(@start_date).strftime("%B %d, %Y")} - #{Date.parse(@end_date).strftime("%B %d, %Y")}"
  end



  def formatted_time_entries
    time_entries.collect do |time_entry|
      {
        date: time_entry.date.strftime("%B %d, %Y"),
        summary: time_entry.summary,
        time_spent: time_entry.time_spent
      }
    end
  end

  def total_minutes
    time_entries.inject(0) { |sum, time_entry| sum + time_entry.time_spent }  
  end

  def job_rate
    # dollars per hour
    @job.hourly_rate * 1000
  end

  def tax_rate
    # percentage
    @job.tax_rate
  end

  def sub_total
    job_rate * total_minutes/60.to_f
  end

  def money_format(amount)
    "$#{number_with_precision(amount/1000, precision: 2)}"
  end

  def tax
    tax_rate * sub_total
  end

  def total
    sub_total + tax
  end
end

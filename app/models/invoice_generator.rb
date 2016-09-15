require 'action_view'

class InvoiceGenerator
  include ActionView::Helpers::NumberHelper

  attr_reader :job, :start_date, :end_date

  def initialize(args)
    @start_date = args[:start_date]
    @end_date = args[:end_date]
    @job = args[:job]
  end

  def invoice
    {
      job: job.title,
      total_minutes: total_minutes,
      hourly_rate: "$#{number_with_precision(job.hourly_rate, precision: 2)}",
      tax_rate: job.tax_rate,
      date_range: date_range,
      sub_total: money_format(sub_total),
      tax: money_format(tax),
      total: money_format(total),
      time_entries: formatted_time_entries
    }
  end

  private

  def total_minutes
    time_entries.inject(0) { |sum, time_entry| sum + time_entry.time_spent }  
  end

  def time_entries
    @time_entries ||= job.time_entries.where(date: Date.parse(@start_date)..Date.parse(@end_date))
  end

  def date_range
    "#{Date.parse(@start_date).strftime("%B %d, %Y")} - #{Date.parse(@end_date).strftime("%B %d, %Y")}"
  end

  def money_format(amount)
    "$#{number_with_precision(amount/100, precision: 2)}"
  end

  def sub_total
    job_rate * total_minutes/60.to_f
  end

  def job_rate
    job.hourly_rate * 100
  end

  def tax
    tax_rate * sub_total
  end

  def tax_rate
    job.tax_rate / 100
  end

   def total
    sub_total + tax
  end

  def formatted_time_entries
    time_entries.sort_by(&:date).reverse.collect do |time_entry|
      {
        date: time_entry.date.strftime("%Y-%m-%d"),
        summary: time_entry.summary,
        time_spent: time_entry.time_spent
      }
    end
  end
end

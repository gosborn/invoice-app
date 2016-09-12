require 'action_view'
class InvoiceGenerator
  include ActionView::Helpers::NumberHelper


  def initialize(args, user)
    @start_date = args[:start_date]
    @end_date = args[:end_date]
    @job = Job.find(args[:job_id])
    @user = user
  end

  def invoice
    {
      job: @job.title,
      date_range: "#{Date.parse(@start_date).strftime("%B %d, %Y")} - #{Date.parse(@end_date).strftime("%B %d, %Y")}",
      sub_total: formatted_sub_total,
      tax: formatted_tax,
      total: formatted_total,
      time_entries: formatted_time_entries
    }
  end

  def time_entries
    @time_entries ||= @job.time_entries.where(date: Date.parse(@start_date)..Date.parse(@end_date))
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

  def formatted_sub_total
    "$#{number_with_precision(sub_total/1000, precision: 2)}"
  end

  def tax
    tax_rate * sub_total
  end

  def formatted_tax
    "$#{number_with_precision(tax/1000, precision: 2)}"
  end

  def total
    sub_total + tax
  end

  def formatted_total
    "$#{number_with_precision(total/1000, precision: 2)}"
  end
end

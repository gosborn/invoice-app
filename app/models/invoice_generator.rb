class InvoiceGenerator


  def initialize(args, user)
    @start_date = args[:start_date]
    @end_date = args[:end_date]
    @job = Job.find(args[:job_id])
    @user = user
  end

  def invoice
    binding.pry
  end

  def time_entries
    @time_entries ||= @job.time_entries.where(date: Date.parse(@start_date)..Date.parse(@end_date))
  end
end

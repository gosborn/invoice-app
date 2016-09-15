module Api
  module V1
    class InvoicesController < ApplicationController

      def index
        render pdf: "#{current_job.title}_invoice_#{invoice_params[:start_date]}-#{invoice_params[:end_date]}",
               template: 'invoices/invoice.html.erb',
               disposition: 'attachment',
               layout: 'pdf',
               locals: { invoice: invoice }
      end

      private

      def invoice_params
        params.require(:invoice).permit(:job_id, :start_date, :end_date)
      end

      def current_job
        @job ||= current_user.jobs.where(id: invoice_params[:job_id]).take!
      end

      def invoice
        InvoiceGenerator.new(
          start_date: invoice_params[:start_date],
          end_date: invoice_params[:end_date],
          job: current_job
        ).invoice
      end
    end
  end
end

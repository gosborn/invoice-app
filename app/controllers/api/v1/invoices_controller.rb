module Api
  module V1
    class InvoicesController < ApplicationController

      def index
        @job = current_user.jobs.where(id: invoice_params[:job_id]).take!
        @invoice = InvoiceGenerator.new({
          start_date: invoice_params[:start_date],
          end_date: invoice_params[:end_date],
          job_id: @job.id
        })

        render pdf: 'invoice',
               template: 'invoices/invoice.html.erb',
               disposition: 'attachment',
               layout: 'pdf',
               show_as_html: params.key?('debug'),
               locals: { invoice: @invoice }
      end

      private

      def invoice_params
        params.require(:invoice).permit(:job_id, :start_date, :end_date)
      end
    end
  end
end
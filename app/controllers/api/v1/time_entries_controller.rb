module Api
  module V1
    class TimeEntriesController < Api::BaseController
      def index
        render json: current_job.time_entries
      end

      def create
        @time_entry = TimeEntry.new(
          time_entry_params.merge(job: current_job)
        )

        if @time_entry.save
          render json: @time_entry
        else
          render json: @time_entry.errors, status: :unprocessable_entity
        end
      end

      def update
        @time_entry = current_job.time_entries.where(id: params[:id]).take!
        @time_entry.update(time_entry_params)
        render json: @time_entry
      end

      def destroy
        current_user.time_entries.where(id: params[:id]).take!.destroy
        head :no_content
      end

      private

      def time_entry_params
        params.require(:time_entry).permit(:time_spent, :date, :summary)
      end

      def current_job
        current_user.jobs.where(id: params[:job_id]).take!
      end
    end
  end
end

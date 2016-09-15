module Api
  module V1
    class JobsController < Api::BaseController
      def index
        render json: current_user.jobs
      end

      def create
        @job = Job.new(
          job_params.merge(user: current_user)
        )

        if @job.save
          render json: @job
        else
          render json: @job.errors, status: :unprocessable_entity
        end
      end

      def update
        @job = current_user.jobs.where(id: params[:id]).take!
        @job.update(job_params)
        render json: @job
      end

      def destroy
        current_user.jobs.where(id: params[:id]).take!.destroy
        head :no_content
      end

      private

      def job_params
        params.require(:job).permit(:title, :hourly_rate, :tax_rate)
      end
    end
  end
end

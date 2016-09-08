module Api
  module V1
    class JobsController < ApplicationController
      def index
        render json: current_user.jobs
      end

      def create
        @job = Job.new(job_params)
        @job.user = current_user

        if @job.save
          render json: @job
        else
          render json: @job.errors, status: :unprocessable_entity
        end
      end

      def update
        @job = current_user.jobs.where(id: job_params[:id]).take!
        @job.update(job_params)
        render json: @job
      end

      def destroy
        current_user.jobs.where(id: params[:id]).take!.destroy
        head :no_content
      end

      private

      def job_params
        params.require(:job).permit(:id, :title, :hourly_rate, :tax_rate)
      end
    end
  end
end

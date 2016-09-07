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

      def destroy
        Job.find(params[:id]).destroy
        head :no_content
      end

      private

      def job_params
        params.require(:job).permit(:id, :title, :hourly_rate, :tax_rate)
      end
    end
  end
end

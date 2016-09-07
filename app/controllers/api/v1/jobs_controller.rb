module Api
  module V1
    class JobsController < ApplicationController
      def index
        render json: current_user.jobs
      end
    end
  end
end

class JobsController < ApplicationController
  def index
    render json: current_user.jobs
  end
end

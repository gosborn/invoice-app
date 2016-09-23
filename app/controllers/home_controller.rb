class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    render layout: 'main'
  end
end

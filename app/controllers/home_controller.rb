class HomeController < ApplicationController

  before_action :authenticate_user!

  def index
    render component: 'Main'
  end
end

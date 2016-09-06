class HomeController < ApplicationController

  before_action :authenticate_user!

  def index
    render component: 'Main', props: { user_email: current_user.email }
  end
end

module Api
  module V1
    class UsersController < Api::BaseController
      def index
        render json: { user_email: current_user.email }
      end
    end
  end
end

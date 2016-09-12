module Api
  class BaseController < ApplicationController

    rescue_from ActionController::ParameterMissing, with: :missing_param
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    BAD_REQUEST_STATUS = 400
    NOT_FOUND_STATUS = 404

    private

    def missing_param(e)
      errors = [
        json_error_for(
          e,
          detail: e.message,
          status: BAD_REQUEST_STATUS,
          code: error_code_for(e.message)
        )
      ]
      render json: { errors: errors }, status: :bad_request
    end

    def record_not_found(e)
      errors = [
        json_error_for(
          e,
          detail: e.message,
          status: NOT_FOUND_STATUS,
          code: error_code_for(e.message)
        )
      ]
      render json: { errors: errors }, status: :not_found
    end

    def error_code_for(message)
      message.sub("can't", 'cannot').parameterize.underscore.upcase
    end

    def json_error_for(e, options)
      {
        id: random_error_id,
        title: e.class.to_s
      }.merge(options.slice(:detail, :status, :code))
    end

    def random_error_id
      SecureRandom.hex(25)
    end
  end
end

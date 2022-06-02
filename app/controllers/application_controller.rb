class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    before_action :set_cors

    def set_cors
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Request-Method'] = '*'
    end
end

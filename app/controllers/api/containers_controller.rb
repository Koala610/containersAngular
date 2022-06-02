
class Api::ContainersController < ApplicationController
    def index
        containers = Container.order('body DESC')
        render json: {status: '200', data:containers},status: :ok
    end
    def show
        container = Container.find(params[:id])
        render json: {status: '200', data:container},status: :ok
    end
    def create
        container = Container.new(container_params)
        if container.save
            render json: {status: '200', data:container},status: :ok
        else
            render json: {status: '400', data:container},status: :unprocessable_entity
        end
    end
    

    private

    def container_params
        params.permit(:body)
    end
end

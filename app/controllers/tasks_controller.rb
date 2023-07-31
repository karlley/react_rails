class TasksController < ApplicationController
  def index
    tasks = Task.all
    #取得したレコードをJSONで返す
    render json: tasks
  end
end

class TasksController < ApplicationController
  def index
    tasks = Task.all
    #取得したレコードをJSONで返す
    render json: tasks
  end

  def create
    Task.create(task_params)
    #ヘッダのレスポンスのみを返す
    head :created
  end

  private

  def task_params
    params.permit(:name, :is_done)
  end
end

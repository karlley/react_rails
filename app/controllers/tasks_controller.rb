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

  def destroy
    task = Task.find(params[:id])
    task.destroy
    #ヘッダのレスポンスのみを返す
    head :ok
  end

  def update
    task = Task.find(params[:id])
    task.update(task_params)
    #ヘッダのレスポンスのみを返す
    head :ok
  end

  private

  def task_params
    #requireでネストしたパラメータも許可する
    params.require(:task).permit(:name, :is_done)
  end
end

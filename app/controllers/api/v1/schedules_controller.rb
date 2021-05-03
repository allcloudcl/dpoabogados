class Api::V1::SchedulesController < Api::V1::BaseController
  before_action :set_schedule, only: %i[ show update destroy ]

  # GET /schedules
  # GET /schedules.json
  def index
    @schedules = Schedule.all
  end

  # GET /schedules/1
  # GET /schedules/1.json
  def show
  end

  # POST /schedules
  # POST /schedules.json
  def create
    @schedule = Schedule.new(schedule_params)

    if @schedule.save
      render :show, status: :created, location: api_v1_schedule_url(@schedule, format: :json)
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /schedules/1
  # PATCH/PUT /schedules/1.json
  def update
    if @schedule.update(schedule_params)
      render :show, status: :ok, location: api_v1_schedule_url(@schedule, format: :json)
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  # DELETE /schedules/1
  # DELETE /schedules/1.json
  def destroy
    @schedule.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_schedule
      @schedule = Schedule.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def schedule_params
      params.fetch(:schedule, {}).permit(:calendar_id, :title, :body, :start, :end, :category, :location)
    end
end

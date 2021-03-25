class Api::V1::CalendarsController < ApplicationController
  before_action :set_calendar, only: %i[ show update destroy ]

  # GET /calendars
  # GET /calendars.json
  def index
    @calendars = Calendar.includes(:schedules).all
  end

  # GET /calendars/1
  # GET /calendars/1.json
  def show
  end

  # POST /calendars
  # POST /calendars.json
  def create
    @calendar = Calendar.new(calendar_params)

    if @calendar.save
      render :show, status: :created, location: api_v1_calendar_url(@calendar, format: :json)
    else
      render json: @calendar.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /calendars/1
  # PATCH/PUT /calendars/1.json
  def update
    if @calendar.update(calendar_params)
      render :show, status: :ok, location: api_v1_calendar_url(@calendar, format: :json)
    else
      render json: @calendar.errors, status: :unprocessable_entity
    end
  end

  # DELETE /calendars/1
  # DELETE /calendars/1.json
  def destroy
    @calendar.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_calendar
      @calendar = Calendar.find_by(user_id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def calendar_params
      params.fetch(:calendar, {})
    end
end

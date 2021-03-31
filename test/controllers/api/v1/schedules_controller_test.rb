require "test_helper"

class Api::V1::SchedulesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @schedule = schedules(:one)
  end

  test "should get index" do
    get api_v1_schedules_url, as: :json
    assert_response :success
  end

  test "should create schedule" do
    assert_difference('Schedule.count') do
      post api_v1_schedules_url, params: { schedule: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show schedule" do
    get api_v1_schedule_url(@schedule), as: :json
    assert_response :success
  end

  test "should update schedule" do
    patch api_v1_schedule_url(@schedule), params: { schedule: {  } }, as: :json
    assert_response 200
  end

  test "should destroy schedule" do
    assert_difference('Schedule.count', -1) do
      delete api_v1_schedule_url(@schedule), as: :json
    end

    assert_response 204
  end
end

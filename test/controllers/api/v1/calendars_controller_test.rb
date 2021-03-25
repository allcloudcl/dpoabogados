require "test_helper"

class Api::V1::CalendarsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @calendar = calendars(:one)
  end

  test "should get index" do
    get api_v1_calendars_url, as: :json
    assert_response :success
  end

  test "should create calendar" do
    assert_difference('Calendar.count') do
      post api_v1_calendars_url, params: { calendar: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show calendar" do
    get api_v1_calendar_url(@calendar), as: :json
    assert_response :success
  end

  test "should update calendar" do
    patch api_v1_calendar_url(@calendar), params: { calendar: {  } }, as: :json
    assert_response 200
  end

  test "should destroy calendar" do
    assert_difference('Calendar.count', -1) do
      delete api_v1_calendar_url(@calendar), as: :json
    end

    assert_response 204
  end
end

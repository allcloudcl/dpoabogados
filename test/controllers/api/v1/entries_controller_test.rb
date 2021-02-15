require "test_helper"

class Api::V1::EntriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @entry = entries(:one)
  end

  test "should create entry" do
    assert_difference('Entry.count') do
      post api_v1_contracts_url, params: { entry: {  } }, as: :json
    end

    assert_response 201
  end

  test "should update entry" do
    patch api_v1_contract_url(@entry), params: { entry: {  } }, as: :json
    assert_response 200
  end

  test "should destroy entry" do
    assert_difference('Entry.count', -1) do
      delete api_v1_contract_url(@entry), as: :json
    end

    assert_response 204
  end
end

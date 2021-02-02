require "test_helper"

class Api::V1::ContractsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @contract = contracts(:one)
  end

  test "should get index" do
    get api_v1_contracts_url, as: :json
    assert_response :success
  end

  test "should create contract" do
    assert_difference('Contract.count') do
      post api_v1_contracts_url, params: { contract: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show contract" do
    get api_v1_contract_url(@contract), as: :json
    assert_response :success
  end

  test "should update contract" do
    patch api_v1_contract_url(@contract), params: { contract: {  } }, as: :json
    assert_response 200
  end

  test "should destroy contract" do
    assert_difference('Contract.count', -1) do
      delete api_v1_contract_url(@contract), as: :json
    end

    assert_response 204
  end
end

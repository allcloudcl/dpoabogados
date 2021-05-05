import axios from "axios";

export const CREATE_CONTRACT_INITIAL = "CREATE_CONTRACT_INITIAL";
export const CREATE_CONTRACT_REQUEST = "CREATE_CONTRACT_REQUEST";
export const CREATE_CONTRACT_SUCCESS = "CREATE_CONTRACT_SUCCESS";
export const CREATE_CONTRACT_FAILURE = "CREATE_CONTRACT_FAILURE";
export const FETCH_CONTRACTS_REQUEST = "FETCH_CONTRACTS_REQUEST";
export const FETCH_CONTRACTS_SUCCESS = "FETCH_CONTRACTS_SUCCESS";
export const FETCH_CONTRACTS_FAILURE = "FETCH_CONTRACTS_FAILURE";

function createContractInitial() {
  return {
    type: CREATE_CONTRACT_INITIAL,
    isFetching: false,
  };
}

function requestCreateContract(contract) {
  return {
    type: CREATE_CONTRACT_REQUEST,
    isFetching: true,
    contract,
  };
}

function createContractSuccess(contract) {
  return {
    type: CREATE_CONTRACT_SUCCESS,
    isFetching: false,
    contract,
  };
}

function createContractError(message) {
  return {
    type: CREATE_CONTRACT_FAILURE,
    isFetching: false,
    message,
  };
}

function requestFetchContracts() {
  return {
    type: FETCH_CONTRACTS_REQUEST,
    isFetching: true,
  };
}

function fetchContractsSuccess(contracts) {
  return {
    type: FETCH_CONTRACTS_SUCCESS,
    isFetching: false,
    contracts,
  };
}

function fetchContractsError(message) {
  return {
    type: FETCH_CONTRACTS_FAILURE,
    isFetching: false,
    message,
  };
}

export function createContract(contractData) {
  return (dispatch) => {
    // We dispatch requestCreateContract to kickoff the call to the API
    dispatch(requestCreateContract(contractData));

    return axios
      .post("/api/v1/contracts", contractData)
      .then((response) => {
        dispatch(createContractSuccess(response.data));
        setTimeout(() => {
          dispatch(createContractInitial());
        }, 5000);
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        dispatch(createContractError(err));
        return Promise.reject(err);
      });
  };
}

export function fetchContracts() {
  return (dispatch) => {
    dispatch(requestFetchContracts());

    return axios
      .get("/api/v1/contracts")
      .then((response) => {
        dispatch(fetchContractsSuccess(response.data));
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        dispatch(fetchContractsError(err));
        return Promise.reject(err);
      });
  };
}

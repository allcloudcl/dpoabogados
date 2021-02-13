import {
  CREATE_CONTRACT_INITIAL,
  CREATE_CONTRACT_REQUEST,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_FAILURE,
  FETCH_CONTRACTS_REQUEST,
  FETCH_CONTRACTS_SUCCESS,
  FETCH_CONTRACTS_FAILURE,
} from '../actions/contracts';

export default function contracts(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case CREATE_CONTRACT_INITIAL:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
      });
    case CREATE_CONTRACT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case CREATE_CONTRACT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: 'Contract created successfully',
      });
    case CREATE_CONTRACT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message:
          'Due to security reasons contracts creation is closed in demo version. Please setup locally to test',
      });
    case FETCH_CONTRACTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_CONTRACTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        contracts: action.contracts,
      });
    case FETCH_CONTRACTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: 'Something wrong happened. Please come back later',
      });
    default:
      return state;
  }
}

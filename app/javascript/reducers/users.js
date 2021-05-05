import {
  CREATE_USER_INITIAL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../actions/users";

export default function users(
  state = {
    isFetching: false,
  },
  action
) {
  switch (action.type) {
    case CREATE_USER_INITIAL:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
      });
    case CREATE_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case CREATE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: "User created successfully",
      });
    case CREATE_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message:
          "Due to security reasons users creation is closed in demo version. Please setup locally to test",
      });
    case FETCH_USERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        users: action.users,
      });
    case FETCH_USERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: "Something wrong happened. Please come back later",
      });
    default:
      return state;
  }
}

import {
  CREATE_SCHEDULE_INITIAL,
  CREATE_SCHEDULE_REQUEST,
  CREATE_SCHEDULE_SUCCESS,
  CREATE_SCHEDULE_FAILURE,
  FETCH_SCHEDULES_REQUEST,
  FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_FAILURE,
} from "../actions/schedules";

export default function schedules(
  state = {
    isFetching: false,
  },
  action
) {
  switch (action.type) {
    case CREATE_SCHEDULE_INITIAL:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
      });
    case CREATE_SCHEDULE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case CREATE_SCHEDULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: "Schedule created successfully",
      });
    case CREATE_SCHEDULE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message:
          "Due to security reasons schedules creation is closed in demo version. Please setup locally to test",
      });
    case FETCH_SCHEDULES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_SCHEDULES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        schedules: action.schedules,
      });
    case FETCH_SCHEDULES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: "Something wrong happened. Please come back later",
      });
    default:
      return state;
  }
}

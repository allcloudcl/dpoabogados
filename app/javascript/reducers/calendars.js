import {
  FETCH_CALENDARS_REQUEST,
  FETCH_CALENDARS_SUCCESS,
  FETCH_CALENDARS_FAILURE,
} from "../actions/calendars";

export default function calendars(
  state = {
    isFetching: false,
  },
  action
) {
  switch (action.type) {
    case FETCH_CALENDARS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_CALENDARS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        calendars: action.calendars,
      });
    case FETCH_CALENDARS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: "Something wrong happened. Please come back later",
      });
    default:
      return state;
  }
}

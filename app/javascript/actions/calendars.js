import axios from "axios";

export const FETCH_CALENDARS_REQUEST = "FETCH_CALENDARS_REQUEST";
export const FETCH_CALENDARS_SUCCESS = "FETCH_CALENDARS_SUCCESS";
export const FETCH_CALENDARS_FAILURE = "FETCH_CALENDARS_FAILURE";


function requestFetchCalendars() {
  return {
    type: FETCH_CALENDARS_REQUEST,
    isFetching: true,
  };
}

function fetchCalendarsSuccess(calendars) {
  return {
    type: FETCH_CALENDARS_SUCCESS,
    isFetching: false,
    calendars,
  };
}

function fetchCalendarsError(message) {
  return {
    type: FETCH_CALENDARS_FAILURE,
    isFetching: false,
    message,
  };
}

export function fetchCalendars() {
  return (dispatch) => {
    dispatch(requestFetchCalendars());

    return axios
      .get("/api/v1/calendars")
      .then((response) => {
        dispatch(fetchCalendarsSuccess(response.data));
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        dispatch(fetchCalendarsError(err));
        return Promise.reject(err);
      });
  };
}

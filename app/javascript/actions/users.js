import axios from "axios";

export const CREATE_USER_INITIAL = "CREATE_USER_INITIAL";
export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

function createUserInitial() {
  return {
    type: CREATE_USER_INITIAL,
    isFetching: false,
  };
}

function requestCreateUser(user) {
  return {
    type: CREATE_USER_REQUEST,
    isFetching: true,
    user,
  };
}

function createUserSuccess(user) {
  return {
    type: CREATE_USER_SUCCESS,
    isFetching: false,
    user,
  };
}

function createUserError(message) {
  return {
    type: CREATE_USER_FAILURE,
    isFetching: false,
    message,
  };
}

function requestFetchUsers() {
  return {
    type: FETCH_USERS_REQUEST,
    isFetching: true,
  };
}

function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    isFetching: false,
    users,
  };
}

function fetchUsersError(message) {
  return {
    type: FETCH_USERS_FAILURE,
    isFetching: false,
    message,
  };
}

export function createUser(userData) {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return (dispatch) => {
    // We dispatch requestCreateUser to kickoff the call to the API
    dispatch(requestCreateUser(userData));
    if (process.env.NODE_ENV === "development") {
      return fetch("/graphql", config)
        .then((response) =>
          response.json().then((user) => ({ user, response }))
        )
        .then(({ user, response }) => {
          if (!response.ok) {
            // If there was a problem, we want to
            // dispatch the error condition
            dispatch(createUserError(user.message));
            return Promise.reject(user);
          }
          // Dispatch the success action
          dispatch(createUserSuccess(user));
          setTimeout(() => {
            dispatch(createUserInitial());
          }, 5000);
          return Promise.resolve(user);
        })
        .catch((err) => console.error("Error: ", err));
    } else {
      dispatch(createUserError(""));
      return Promise.reject();
    }
  };
}

export function fetchUsers() {
  return (dispatch) => {
    dispatch(requestFetchUsers());

    return axios
      .get("/api/v1/users")
      .then((response) => {
        dispatch(fetchUsersSuccess(response.data));
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        dispatch(fetchUsersError(err));
        return Promise.reject(err);
      });
  };
}

import axios from 'axios';

export const CREATE_SCHEDULE_INITIAL = 'CREATE_SCHEDULE_INITIAL';
export const CREATE_SCHEDULE_REQUEST = 'CREATE_SCHEDULE_REQUEST';
export const CREATE_SCHEDULE_SUCCESS = 'CREATE_SCHEDULE_SUCCESS';
export const CREATE_SCHEDULE_FAILURE = 'CREATE_SCHEDULE_FAILURE';
export const FETCH_SCHEDULES_REQUEST = 'FETCH_SCHEDULES_REQUEST';
export const FETCH_SCHEDULES_SUCCESS = 'FETCH_SCHEDULES_SUCCESS';
export const FETCH_SCHEDULES_FAILURE = 'FETCH_SCHEDULES_FAILURE';

function createScheduleInitial() {
    return {
        type: CREATE_SCHEDULE_INITIAL,
        isFetching: false,
    };
}

function requestCreateSchedule(schedule) {
    return {
        type: CREATE_SCHEDULE_REQUEST,
        isFetching: true,
        schedule,
    };
}

function createScheduleSuccess(schedule) {
    return {
        type: CREATE_SCHEDULE_SUCCESS,
        isFetching: false,
        schedule,
    };
}

function createScheduleError(message) {
    return {
        type: CREATE_SCHEDULE_FAILURE,
        isFetching: false,
        message,
    };
}

function requestFetchSchedules() {
    return {
        type: FETCH_SCHEDULES_REQUEST,
        isFetching: true,
    };
}

function fetchSchedulesSuccess(schedules) {
    return {
        type: FETCH_SCHEDULES_SUCCESS,
        isFetching: false,
        schedules,
    };
}

function fetchSchedulesError(message) {
    return {
        type: FETCH_SCHEDULES_FAILURE,
        isFetching: false,
        message,
    };
}

export function createSchedule(scheduleData) {
    return dispatch => {
        // We dispatch requestCreateSchedule to kickoff the call to the API
        dispatch(requestCreateSchedule(scheduleData));

        return axios.post('/api/v1/schedules', scheduleData)
            .then(response => {
                dispatch(createScheduleSuccess(response.data));
                setTimeout(() => {
                    dispatch(createScheduleInitial());
                }, 5000);
                return Promise.resolve(response.data);
            })
            .catch(err => {
                dispatch(createScheduleError(err));
                return Promise.reject(err);
            })
    };
}

export function fetchSchedules() {
    return dispatch => {
        dispatch(requestFetchSchedules());

        return axios.get('/api/v1/schedules')
            .then(response => {
                dispatch(fetchSchedulesSuccess(response.data));
                return Promise.resolve(response.data);
            })
            .catch(err => {
                dispatch(fetchSchedulesError(err));
                return Promise.reject(err);
            })
    };
}

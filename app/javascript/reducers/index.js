import { combineReducers } from "redux";
import auth from "./auth";
import runtime from './runtime';
import navigation from './navigation';
import contracts from './contracts';
import users from './users';

export default combineReducers({
    auth,
    runtime,
    navigation,
    contracts,
    users,
});

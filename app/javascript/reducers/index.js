import { combineReducers } from "redux";
import auth from "./auth";
import runtime from "./runtime";
import navigation from "./navigation";
import contracts from "./contracts";
import users from "./users";
import calendars from "./calendars";
import schedules from "./schedules";

export default combineReducers({
  auth,
  runtime,
  navigation,
  contracts,
  users,
  calendars,
  schedules,
});

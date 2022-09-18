import { combineReducers, createStore } from "redux";
import { vacationsReducer } from "./VacationsState";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./AuthState";
import { followersReducer } from "./FollowersState";

const reducers = combineReducers({vacationsState: vacationsReducer, authState: authReducer, followersState: followersReducer});
const store = createStore(reducers, composeWithDevTools());

export default store;
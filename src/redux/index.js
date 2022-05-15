import { combineReducers, createStore } from "redux";

import bookReducer from "./book";

const reducer = combineReducers({
  book: bookReducer,
});
const store = createStore(reducer);

export default store;

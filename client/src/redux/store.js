// Esse é um boilerplate; a maioria dos store.js terão essa carinha aí

import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // middleware

import alertReducer from './alert/alertReducer'
import authReducer from "./auth/authReducer";

const middleware = [thunk];

const rootReducer = combineReducers({alert: alertReducer, auth: authReducer})
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store

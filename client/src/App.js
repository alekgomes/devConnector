import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import setAuthToken from './utils/setAuthToken'
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/auth/authAction";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Route exact path="/" component={Landing} />
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </>
      </Router>
    </Provider>
  );
}

export default App;

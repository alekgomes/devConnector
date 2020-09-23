import React, { useState } from "react";
import { setAlert } from "../../redux/alert/alertAction";
import { Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authAction";

const Login = ({ loginUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const { email, password } = formData;

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <section>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign IntoYour Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            placeholder="Email Address"
            onChange={(e) => onChange(e)}
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
            name="password"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
  };
};

export default connect(null, { loginUser })(Login);

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authAction";
import { sanitizeCookie } from "express-validator";

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
    return <Redirect to="/dashboard" />;
  }

  return (
    <section>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Logue na sua conta
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            placeholder="Email"
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

export default connect(null, { loginUser })(Login);

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../redux/alert/alertAction";
import { registerUser } from "../../redux/auth/authAction";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("Password do not match", "danger"));
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  const { name, email, password, password2 } = formData;

  if(isAuthenticated) {
    return <Redirect to="/dashboard"/>
  }

  return (
    <section>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Crie sua conta
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => onChange(e)}
            name="email"
            
          />
          <small className="form-text">
            Esse site utiliza Gravatar para gerar imagens de perfil             
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirme Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Registrar" />
      </form>
      <p className="my-1">
        Já possui uma conta? <a href="login.html">Sign In</a>
      </p>
    </section>
  );
};

export default Register;

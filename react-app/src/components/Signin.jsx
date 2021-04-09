import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import "./Signin.css"
import logo from './logo.svg'
import { SigninSchema } from "../validation/formValidation.js";

const Signin = () => {
  const history = useHistory();
  const togglePanel = () => {
    history.push("/signup");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
    onSubmit: (values, { resetForm }) => {
      const form = JSON.stringify(values);
      alert(form);
      resetForm();
    },
  });
  return (
    
    <section>
      <div className='container'>
      <form onSubmit={formik.handleSubmit}>
        <img src={logo} className="logo"/>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className='form-error'>{formik.errors.email}</div>
        ) : null}

        <label htmlFor='password'>Hasło</label>
        <input
          id='password'
          name='password'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className='form-error'>{formik.errors.password}</div>
        ) : null}
        <button className='login-button' type='submit'>Zaloguj</button>
      </form>
      <aside>
        <p>Nie masz jeszcze konta TouchTalk?</p>
        <button className='register-button' onClick={togglePanel}>Utwórz nowe konto</button>
      </aside>
      </div>
    </section>
    
  );
};

export default Signin;

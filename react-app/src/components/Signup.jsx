import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import logo from './logo.svg'
import "./Signup.css"
import { SignupSchema } from "../validation/formValidation.js";

const Signup = () => {
  const history = useHistory();
  const togglePanel = () => {
    history.push("/");
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm }) => {
      const form = JSON.stringify(values);
      alert(form);
      resetForm();
    },
  });
  return (
    <section className='container'>
      <div className='login-container'>
      <img src={logo} className="logo"/>
      <aside className='register-aside'>
        <p>Masz już konto TouchTalk?</p>
        <button onClick={togglePanel}>Zaloguj się</button>
      </aside>
      </div>
      <div className='register-container'>
      <h1>Załóż konto w TouchTalk</h1>
      <h3>Aby założyć konto, wypełnij poniższe pola</h3>
      <p>Twoje dane</p>
      <form className='register-form' onSubmit={formik.handleSubmit}>
        <div className='name-surname'>
          <div className='name'>
          <label htmlFor='firstname'>Imię</label>
          <input
            id='firstname'
            name='firstname'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.firstname}
          />
        {formik.touched.firstname && formik.errors.firstname ? (
          <div className='form-error'>{formik.errors.firstname}</div>
        ) : null}
        </div>
        <div className='surname'>
        <label htmlFor='lastname'>Nazwisko</label>
        <input
          id='lastname'
          name='lastname'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.lastname}
        />
        {formik.touched.lastname && formik.errors.lastname ? (
          <div className='form-error'>{formik.errors.lastname}</div>
        ) : null}
        </div>
        </div>

        <p>Dane konta</p>
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
        <button className='register-button-signup' type='submit'>Zarejestruj</button>
      </form>
      </div>
    </section>
  );
};

export default Signup;

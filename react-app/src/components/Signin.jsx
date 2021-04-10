import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { SigninSchema } from "../validation/formValidation.js";
import { useDispatch } from "react-redux";
import { signin } from "../actions/auth.js";
const Signin = () => {
  const dispatch = useDispatch();
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
      const form = {
        email: values.email,
        password: values.password,
      };
      dispatch(signin(form));
      resetForm();
    },
  });
  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
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
        <button type='submit'>Zaloguj</button>
      </form>
      <aside>
        <p>Nie masz jeszcze konta TouchTalk?</p>
        <button onClick={togglePanel}>Utwórz nowe konto</button>
      </aside>
    </section>
  );
};

export default Signin;

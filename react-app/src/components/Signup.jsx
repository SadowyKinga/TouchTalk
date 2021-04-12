import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { SignupSchema } from "../validation/formValidation.js";

const Signup = () => {
  const history = useHistory();
  const togglePanel = () => {
    history.push("/");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm }) => {
      const form = {
        email: values.email,
        password: values.password,
        userDetails:{
          name: values.name, 
          surname: values.surname
        }
      };
      console.log(form)
      resetForm();
    },
  });
  return (
    <section>
      <h1>Załóż konto w TouchTalk</h1>
      <h3>Aby założyć konto, wypełnij poniższe pola</h3>
      <p>Twoje dane</p>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='name'>Imię</label>
        <input
          id='name'
          name='name'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className='form-error'>{formik.errors.name}</div>
        ) : null}
        <label htmlFor='surname'>Nazwisko</label>
        <input
          id='surname'
          name='surname'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.surname}
        />
        {formik.touched.surname && formik.errors.surname ? (
          <div className='form-error'>{formik.errors.surname}</div>
        ) : null}
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
        <button type='submit'>Zarejestruj</button>
      </form>
      <aside>
        <p>Masz już konto TouchTalk?</p>
        <button onClick={togglePanel}>Zaloguj się</button>
      </aside>
    </section>
  );
};

export default Signup;

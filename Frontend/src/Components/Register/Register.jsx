
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 
import { useSelector } from 'react-redux';

const Register = () => {

  const translate = useSelector((state) => state.Localization.translation);


  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    name: Yup.string()
      .required('Name is required'),
    username: Yup.string()
      .matches(/^\S*$/, 'Username should not contain spaces')
      .required('Username is required'),
    password: Yup.string()
      .min(4, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one digit')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = existingUsers.some(user => user.email === values.email);

    if (emailExists) {
      setErrorMessage('User with this email already exists'); 
      return;
    }

    existingUsers.push(values);

    localStorage.setItem('users', JSON.stringify(existingUsers));

    navigate('/login');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-50 m-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">Register</h2>
        
        {errorMessage && (
          <div className="alert alert-danger text-center mb-3">
            {errorMessage}
          </div>
        )}
        
        <Formik
          initialValues={{
            email: '',
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">{translate.email}</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">{translate.name}</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label">{translate.userName}</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">{translate.password}</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">{translate.confirmPassword}</label>
                <Field type="password" name="confirmPassword" className="form-control" />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100" 
                
              >
                {translate.register}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <button className="btn btn-link" onClick={() => navigate('/login')}>
          {translate.logSentence}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

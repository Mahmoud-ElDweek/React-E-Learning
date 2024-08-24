
// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import './Register.css'; // For additional styling if needed
// // import "../../Translation/EN";
// // import "../../Translation/AR";


// const Register = () => {
//   const navigate = useNavigate();
//   // const translate = useSelector((state) => state.Localization.translation);

//   // Validation schema using Yup
//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email('Invalid email format')
//       .required('Email is required'),
//     name: Yup.string()
//       .required('Name is required'),
//     username: Yup.string()
//       .matches(/^\S*$/, 'Username should not contain spaces')
//       .required('Username is required'),
//     password: Yup.string()
//       .min(4, 'Password must be at least 8 characters')
//       .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
//       .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
//       .matches(/\d/, 'Password must contain at least one digit')
//       .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
//       .required('Password is required'),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Confirm Password is required'),
//   });

//   // Handle form submission
//   const handleSubmit = (values) => {
//     // Retrieve existing users from localStorage
//     const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

//     // Check if the email already exists
//     const emailExists = existingUsers.some(user => user.email === values.email);

//     if (emailExists) {
//       alert('User with this email already exists');
//       return;
//     }

//     // Add new user to the list
//     existingUsers.push(values);

//     // Save updated user list to localStorage
//     localStorage.setItem('users', JSON.stringify(existingUsers));

//     console.log('User data saved to local storage:', values);
//     navigate('/login'); // Redirect to the login page after successful registration
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-50">
//       <div className="card p-4">
//         <h2 className="text-center mb-4">Register</h2>
//         <Formik
//           initialValues={{
//             email: '',
//             name: '',
//             username: '',
//             password: '',
//             confirmPassword: '',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting, dirty }) => (
//             <Form>
//               {/* Form fields */}
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Email Address</label>
//                 <Field type="email" name="email" className="form-control" />
//                 <ErrorMessage name="email" component="div" className="text-danger" />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">Name</label>
//                 <Field type="text" name="name" className="form-control" />
//                 <ErrorMessage name="name" component="div" className="text-danger" />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="username" className="form-label">Username</label>
//                 <Field type="text" name="username" className="form-control" />
//                 <ErrorMessage name="username" component="div" className="text-danger" />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">Password</label>
//                 <Field type="password" name="password" className="form-control" />
//                 <ErrorMessage name="password" component="div" className="text-danger" />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//                 <Field type="password" name="confirmPassword" className="form-control" />
//                 <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
//               </div>

//               <button type="submit" className="btn btn-primary w-100" onChange={isSubmitting ||!dirty}>
//                 Register
//               </button>
//             </Form>
//           )}
//         </Formik>
//         <div className="text-center mt-3">
//           <button className="btn btn-link" onClick={() => navigate('/login')}>
//            If You have an account? Login here
//           </button>
// </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // For additional styling if needed

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // حالة لتخزين رسالة الخطأ

  // Validation schema using Yup
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

  // Handle form submission
  const handleSubmit = (values) => {
    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    const emailExists = existingUsers.some(user => user.email === values.email);

    if (emailExists) {
      setErrorMessage('User with this email already exists'); // تعيين رسالة الخطأ بدلاً من alert
      return;
    }

    // Add new user to the list
    existingUsers.push(values);

    // Save updated user list to localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    console.log('User data saved to local storage:', values);
    navigate('/login'); // Redirect to the login page after successful registration
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-50">
      <div className="card p-4">
        <h2 className="text-center mb-4">Register</h2>
        
        {/* عرض رسالة الخطأ إذا كانت موجودة */}
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
          {({ isSubmitting, dirty }) => (
            <Form>
              {/* Form fields */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <Field type="password" name="confirmPassword" className="form-control" />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100" 
                onChange={isSubmitting || !dirty} // تعديل الزر ليتم تمكينه فقط عندما يتم تعديل النموذج
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <button className="btn btn-link" onClick={() => navigate('/login')}>
           If You have an account? Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

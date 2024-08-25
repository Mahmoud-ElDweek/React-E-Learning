
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export default function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Validate function
  const IsValidate = () => {
            let isproceed = true;
            let errormessage = 'Please enter the value in ';
            if (userName === null || userName === '') {
                isproceed = false;
                errormessage += ' Username';
            }
            if (password === null || password === '') {
                isproceed = false;
                errormessage += ' Password';
            }
            if (repassword === null || repassword === '') {
                isproceed = false;
                errormessage += 'Confirm Password';
            }
            if (email === null || email === '') {
                isproceed = false;
                errormessage += ' Email';
            }
    
            if(!isproceed){
                toast.warning(errormessage)
            }else{
                if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
                    isproceed = false;
                    toast.warning('Please enter the valid email')
                }
                else if (userName.length < 3) {
                    isproceed = false;
                    toast.warning('Username must be at least 3 characters long');
                } 
                else if (/\s/.test(userName)) {
                    isproceed = false;
                    toast.warning('Username should not contain spaces');
                }
                else if(password !== repassword){
                    isproceed = false;
                    toast.warning('Passwords do not match');
                }
                else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/.test(password)) {
                        isproceed = false;
                        toast.warning('Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
                    }
            }
            return isproceed;
        }


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { userName, password, repassword, email };

    if (IsValidate()) {
    
    axios.post('http://localhost:3001/users', data)
        .then((res) => {
          toast.success('Registered successfully.');
          navigate('/login');
        })
        .catch((err) => {
          toast.error('Registration failed Check your email and password.');
        });
    } else {
      toast.warning(errorMessage);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Register</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Username</label>
            <input
            
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
            
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
            
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="repassword" className="form-label">Confirm Password</label>
            <input
            
              type="password"
              id="repassword"
              value={repassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <div className="text-center mt-3 text-dark">
          <Link to="/login" className="btn btn-link text-dark">
            If you have an account, <span className='text-decoration-underline text-primary'>login here</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

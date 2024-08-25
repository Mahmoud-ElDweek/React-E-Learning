
import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();





    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
      
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
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
        
            
            else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/.test(password)) {
                    isproceed = false;
                    toast.warning('Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
                }
        }
        return isproceed;
    }






    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { password, email };
    
        if (IsValidate()) {
        
        axios.get('http://localhost:3001/users')
            .then((res) => {
                // console.log(res.data)
              res.data.map((user)=>{
                if(user.email===email){
                    if(user.password===password){
              toast.success('Login successfly');
              navigate("/")

                    }else{
                        toast.warning("Wrong Password");
                    }

                }
              })
            })
            .catch((err) => {
              toast.error('Login failed Check your email and password.');
            });
        }

    }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "100%", maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3 text-dark">
          <Link to="/register" className="btn btn-link text-dark">
            If you dont have an account
            <span className="text-decoration-underline text-primary">
              Register here
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

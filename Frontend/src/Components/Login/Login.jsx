



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status in localStorage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = 'Please enter the value in ';

    if (!password) {
      isproceed = false;
      errormessage += 'Password ';
    }
    if (!email) {
      isproceed = false;
      errormessage += 'Email ';
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        isproceed = false;
        toast.warning('Please enter a valid email');
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/.test(password)) {
        isproceed = false;
        toast.warning('Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
      }
    }
    return isproceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { password, email };

    if (IsValidate()) {
      axios.get('http://localhost:3001/users')
        .then((res) => {
          let validUser = false;

          res.data.forEach((user) => {
            if (user.email === email) {
              if (user.password === password) {
                validUser = true;
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', user.id); // Save user ID in localStorage
                localStorage.setItem('username', user.email); // Save user ID in localStorage
                toast.success('Login successful');
                navigate("/");
              } else {
                toast.warning("Wrong Password");
              }
            }
          });

          if (!validUser) {
            toast.error('Login failed. Check your email and password.');
          }
        })
        .catch((err) => {
          toast.error('An error occurred while logging in.');
        });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login status
    localStorage.removeItem('isLoggedIn'); // Remove login status
    localStorage.removeItem('userId'); // Remove user ID
    setEmail('');
    setPassword('');
    toast.info('Logged out successfully.');
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "100%", maxWidth: "600px" }}>
        <h2 className="text-center mb-4">{isLoggedIn ? "Are You Sure Logout!" : "Login"}</h2>

        {!isLoggedIn ? (
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
        ) : (
          <button onClick={handleLogout} className="btn btn-danger w-100">
            Logout
          </button>
        )}

        {!isLoggedIn && (
          <div className="text-center mt-3 text-dark">
            <Link to="/register" className="btn btn-link text-dark">
              If you don't have an account
              <span className="text-decoration-underline text-primary">
                Register here
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

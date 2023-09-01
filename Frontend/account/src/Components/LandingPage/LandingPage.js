
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { register, login } from '../../API_service';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Toggling between signup and login mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        const response = await register(formData);
        console.log('User registered successfully:', response.existingUser);

         // Redirecting to the login page after registration
        setIsSignUp(false); // Switch to the login form

      }
      else {
          // Handling login logic
          const response = await login(formData);
          console.log('Login response:', response); 
      
          if(response.userExists && response.userExists.role)
        
          {
            
            if (response.userExists.role === 'admin') {
              navigate('/AdminPage'); // Redirecting to adminpage
          } else {
            navigate('/UserPage'); // Redirecting to user user page
          }
      
        }
        else {
          console.error('Role not found in response data');
        }
          
        }
      } catch (error) {
        console.error('API request failed:', error);
      }
    };
 

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card no-card-border" style={{ width: '80%' }}>
        <div className="row">
          <div className="col-md-6">
            <h1 style={{ color: 'blue', marginBottom: '30px' }}>
              {isSignUp ? 'Sign Up' : 'Login'}
            </h1>
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {isSignUp && (
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <div>
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="role"
                        value="admin"
                        checked={formData.role === 'admin'}
                        onChange={handleInputChange}
                      />{' '}
                      Admin
                    </label>
                    <label className="form-check-label ms-3 ">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="role"
                        value="user"
                        checked={formData.role === 'user'}
                        onChange={handleInputChange}
                      />{' '}
                      User
                    </label>
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary">
                {isSignUp ? 'Sign Up' : 'Login'}
              </button>
            </form>
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={toggleForm}
                className="btn btn-link"
                style={{ color: 'blue' }}
              >
                {isSignUp ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-login_516790-1261.jpg"
              alt="Landing Page Image"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

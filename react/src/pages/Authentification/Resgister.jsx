import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  // State variables to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    password: "",
  });

  // State variables for error handling
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData)
      const response = await axios.post("http://localhost:3000/api/auth/signup", formData);
      if (response.status === 201) {
        alert("User created successfully!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="authentication-wrapper authentication-basic container-p-y">
      <div className="authentication-inner">
        <div className="card">
          <div className="card-body">
            <div className="app-brand justify-content-center">
              <a href="index.html" className="app-brand-link gap-2">
                <span className="app-brand-logo demo">
                  {/* Add your logo here */}
                </span>
                <span className="app-brand-text demo text-body fw-bolder">Sneat</span>
              </a>
            </div>
            <h4 className="mb-2">Adventure starts here 🚀</h4>
            <p className="mb-4">Make your app management easy and fun!</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter your username"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select
                  className="form-control"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                  <option value="nurse">Nurse</option>
                  <option value="triage_nurse">Triage-nurse</option>
                  <option value="receptionnist">Receptionnist</option>
                  <option value="ambulance_driver">Ambulance_driver</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 form-password-toggle">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="input-group input-group-merge">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span className="input-group-text cursor-pointer">
                    <i className="bx bx-hide"></i>
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="terms-conditions"
                    name="terms"
                  />
                  <label className="form-check-label" htmlFor="terms-conditions">
                    I agree to
                    <a href="javascript:void(0);">privacy policy & terms</a>
                  </label>
                </div>
              </div>
              <button className="btn btn-primary d-grid w-100" type="submit">
                Sign up
              </button>
            </form>

            <p className="text-center">
              <span>Already have an account?</span>
              <a href="login">
                <span>Sign in instead</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

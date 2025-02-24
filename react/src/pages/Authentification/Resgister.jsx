import React, { useState } from "react";

const EmployeeRegistration = () => {
  // State for form data
  const [formData, setFormData] = useState({
    cin: "",
    name: "",
    familyName: "",
    birthday: "",
    gender: "",
    phone: "",
    role: "",
    email: "",
    password: "",
    joinDate: "",
    adresse: "",
    status: "",
    qualifications: {
      degree: "",
      institution: "",
      year: "",
      certifications: {
        certification: "",
      },
    },
  });

  // State for success/error messages
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields (e.g., qualifications)
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error during registration");
      }

      setSuccess("Employee registered successfully!");
      setFormData({
        cin: "",
        name: "",
        familyName: "",
        birthday: "",
        gender: "",
        phone: "",
        role: "",
        email: "",
        password: "",
        joinDate: "",
        adresse: "",
        status: "",
        qualifications: {
          degree: "",
          institution: "",
          year: "",
          certifications: {
            certification: "",
          },
        },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header  text-white">
              <h2 className="text-center">Employee Registration</h2>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                {/* CIN */}
                <div className="mb-3">
                  <label className="form-label">CIN</label>
                  <input
                    type="number"
                    name="cin"
                    value={formData.cin}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Family Name */}
                <div className="mb-3">
                  <label className="form-label">Family Name</label>
                  <input
                    type="text"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Birthday */}
                <div className="mb-3">
                  <label className="form-label">Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Gender */}
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Role */}
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="triage_nurse">Triage Nurse</option>
                    <option value="receptionnist">Receptionist</option>
                    <option value="ambulance_driver">Ambulance Driver</option>
                  </select>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Join Date */}
                <div className="mb-3">
                  <label className="form-label">Join Date</label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="on_leave">On Leave</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>

                {/* Qualifications */}
                <div className="mb-3">
                  <label className="form-label">Degree</label>
                  <input
                    type="text"
                    name="qualifications.degree"
                    value={formData.qualifications.degree}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Institution</label>
                  <input
                    type="text"
                    name="qualifications.institution"
                    value={formData.qualifications.institution}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Year</label>
                  <input
                    type="number"
                    name="qualifications.year"
                    value={formData.qualifications.year}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Certification</label>
                  <input
                    type="text"
                    name="qualifications.certifications.certification"
                    value={formData.qualifications.certifications.certification}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
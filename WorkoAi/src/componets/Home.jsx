import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [referralData, setReferralData] = useState([]);
  const [newReferral, setNewReferral] = useState({
    name: "",
    email: "",
    experience: "",
    resume: null,
    status: "New",
  });

  // Fetch referrals from local storage on component mount
  useEffect(() => {
    const storedReferrals = JSON.parse(localStorage.getItem("referrals")) || [];
    setReferralData(storedReferrals);
  }, []);

  // Handle input change for text fields and dropdown
  const handleReferralChange = (e) => {
    const { name, value } = e.target;
    setNewReferral({ ...newReferral, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setNewReferral({ ...newReferral, resume: e.target.files[0] });
  };

  // Submit referral form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new referral to referralData
    const newReferralData = {
      ...newReferral,
      _id: new Date().toISOString(), // Use a unique ID
    };

    const updatedReferrals = [...referralData, newReferralData];
    setReferralData(updatedReferrals);

    // Save updated data to local storage
    localStorage.setItem("referrals", JSON.stringify(updatedReferrals));

    // Clear form fields after successful submission
    setNewReferral({
      name: "",
      email: "",
      experience: "",
      resume: null,
      status: "New",
    });

    alert("Referral added successfully!");
  };

  // Update referral status
  const handleStatusChange = (id, status) => {
    const updatedReferrals = referralData.map((referral) =>
      referral._id === id ? { ...referral, status } : referral
    );
    setReferralData(updatedReferrals);

    // Update the referrals in local storage
    localStorage.setItem("referrals", JSON.stringify(updatedReferrals));
  };

  return (
    <div className="container">
      <h3 style={{ textAlign: "center" }}>Raise a New Referral</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          value={newReferral.name}
          onChange={handleReferralChange}
          required
        />
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          name="email"
          value={newReferral.email}
          onChange={handleReferralChange}
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="Experience"
          name="experience"
          value={newReferral.experience}
          onChange={handleReferralChange}
          required
        />
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
          required
        />
        <select
          className="form-control"
          name="status"
          value={newReferral.status}
          onChange={handleReferralChange}
        >
          <option value="New">New</option>
          <option value="Evaluated">Evaluated</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <h3>Referral Candidates</h3>
      <ul>
        {referralData.map((referral) => (
          <li key={referral._id}>
            <div>
              <strong>Name:</strong> {referral.name}
            </div>
            <div>
              <strong>Email:</strong> {referral.email}
            </div>
            <div>
              <strong>Experience:</strong> {referral.experience}
            </div>
            <div>
              <strong>Status:</strong> {referral.status}
            </div>
            <div>
              <strong>Resume:</strong>{" "}
              {referral.resume && (
                <a
                  href={URL.createObjectURL(referral.resume)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              )}
            </div>
            <button onClick={() => handleStatusChange(referral._id, "Hired")}>
              Hired
            </button>
            <button
              onClick={() => handleStatusChange(referral._id, "Rejected")}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Step1Personal from "./components/Step1Personal";
import Step2Professional from "./components/Step2Professional";
import { Step3Preferences } from "./components/Step3Preferences";
import { SummaryPage } from "./components/SummaryPage";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newPassword: "",
    profession: "",
    company: "",
    addressLine1: "",
    country: "",
    state: "",
    city: "",
    plan: "Basic",
    newsletter: true,
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const api = "https://interview-39d5.onrender.com/api";

  useEffect(() => {
    axios.get(`${api}/countries`).then((res) => setCountries(res.data));
  }, []);

  useEffect(() => {
    if (formData.country) {
      axios
        .get(`${api}/states/${formData.country}`)
        .then((res) => setStates(res.data));
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      axios
        .get(`${api}/cities/${formData.state}`)
        .then((res) => setCities(res.data));
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (
        file &&
        ["image/jpeg", "image/png"].includes(file.type) &&
        file.size <= 2 * 1024 * 1024
      ) {
        setFormData({ ...formData, profileImage: file });
        setPreview(URL.createObjectURL(file));
      } else {
        alert("Only JPG or PNG under 2MB allowed");
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (
      !formData.username ||
      formData.username.length < 4 ||
      formData.username.includes(" ")
    ) {
      errs.username = "username require";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "email require";
    }
    if (formData.newPassword && formData.password) {
      if (formData.newPassword !== formData.password)
        errs.password = "Password is not matched";
      if (!formData.password) errs.password = "Current password required";
      if (!/^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(formData.newPassword))
        errs.newPassword = "Weak password";
    }
    if (!formData.profileImage) errs.profileImage = "Profile image required";
    if (step === 2) {
      if (!formData.profession) errs.profession = "Profession is required";
      if (formData.profession === "Entrepreneur" && !formData.company)
        errs.company = "Company required";
      if (!formData.addressLine1) errs.addressLine1 = "Address required";
    }
    if (step === 3) {
      if (!formData.country) errs.country = "Country required";
      if (!formData.state) errs.state = "State required";
      if (!formData.city) errs.city = "City required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validate()) setStep(step + 1);
  };
  const Prev = () => {
    setStep(step - 1);
  };

  const submit = async () => {
    const submitData = new FormData();
    submitData.append("profileImage", formData.profileImage);
    submitData.append(
      "data",
      JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        newPassword: formData.newPassword,
        profession: formData.profession,
        company: formData.profession === "Entrepreneur" ? formData.company : "",
        addressLine1: formData.addressLine1,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        plan: formData.plan,
        newsletter: formData.newsletter,
      })
    );

    try {
      const res = await axios.post(`${api}/submit`, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        alert("Profile Submitted Successfully");
        setSubmitted(true);
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>User Profile Form</h1>
      </header>

      <div className="stepper-wrapper">
        <aside className="stepper-sidebar">
          <div className={`step ${step === 1 ? "active" : ""}`}>
            1 <span>Personal Info</span>
          </div>
          <div className={`step ${step === 2 ? "active" : ""}`}>
            2 <span>Professional</span>
          </div>
          <div className={`step ${step === 3 ? "active" : ""}`}>
            3 <span>Preferences</span>
          </div>
          <div className={`step ${step === 4 ? "active" : ""}`}>
            4 <span>Summary</span>
          </div>
        </aside>

        <div className="form-container">
          {submitted ? (
            <SummaryPage formData={formData} preview={preview} />
          ) : (
            <>
              <h2>Step {step}</h2>

              {step === 1 && (
                <Step1Personal
                  formData={formData}
                  handleChange={handleChange}
                  preview={preview}
                  errors={errors}
                />
              )}

              {step === 2 && (
                <Step2Professional
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              )}

              {step === 3 && (
                <Step3Preferences
                  formData={formData}
                  handleChange={handleChange}
                  countries={countries}
                  states={states}
                  cities={cities}
                  errors={errors}
                />
              )}

          
              <div className="sub-btn">
                  {step === 4 && (
                <SummaryPage
                  formData={formData}
                  preview={preview}
                  // onBack={() => setStep(3)}
                  onSubmit={submit}
                />
              )}
                {step < 4 && <button onClick={next}>Next</button>}
                {step > 1 && <button onClick={Prev}>Prev</button>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

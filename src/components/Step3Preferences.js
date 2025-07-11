import React from "react";

export function Step3Preferences({
  formData,
  handleChange,
  countries,
  states,
  cities,
  errors,
}) {
  return (
    <>
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <div style={{color:'red'}}>{errors.country}</div>

      <select name="state" value={formData.state} onChange={handleChange}>
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <div style={{color:'red'}}>{errors.state}</div>

      <select name="city" value={formData.city} onChange={handleChange}>
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <div style={{color:'red'}}>{errors.city}</div>

    <div className="plan-options">
  <label>
    <input
      type="radio"
      name="plan"
      value="Basic"
      checked={formData.plan === "Basic"}
      onChange={handleChange}
    />{" "}
    Basic
  </label>
  <label>
    <input
      type="radio"
      name="plan"
      value="Pro"
      checked={formData.plan === "Pro"}
      onChange={handleChange}
    />{" "}
    Pro
  </label>
  <label>
    <input
      type="radio"
      name="plan"
      value="Enterprise"
      checked={formData.plan === "Enterprise"}
      onChange={handleChange}
    />{" "}
    Enterprise
  </label>
</div>
<div className="newsletter-container">
  <label className="newsletter-label">
    Subscribe to Newsletter
    <input
    style={{width:"10%"}}
      type="checkbox"
      name="newsletter"
      checked={formData.newsletter}
      onChange={handleChange}
    />
  </label>
</div>


    </>
  );
}

import React from "react";

export default function Step2Professional({ formData, handleChange, errors }) {
  return (
    <>
      <select
        name="profession"
        value={formData.profession}
        onChange={handleChange}
      >
        <option value="">Select Profession</option>
        <option value="Student">Student</option>
        <option value="Developer">Developer</option>
        <option value="Entrepreneur">Entrepreneur</option>
      </select>
      <div style={{color:'red'}}>{errors.profession}</div>

      {formData.profession === "Entrepreneur" && (
        <>
          <input
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
          />
          <div style={{color:'red'}}>{errors.company}</div>
        </>
      )}

      <input
        name="addressLine1"
        placeholder="Address Line 1"
        value={formData.addressLine1}
        onChange={handleChange}
      />
      <div style={{color:'red'}}>{errors.addressLine1}</div>
    </>
  );
}

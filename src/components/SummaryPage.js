import React from "react";

export function SummaryPage({ formData, preview, onBack, onSubmit }) {
  return (
    <>
      {onSubmit ? " ":<h2>Summary</h2>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>Username:</strong> {formData.username}
        </li>
        <li>
          <strong>Email:</strong> {formData.email}
        </li>
        <li>
          <strong>Profession:</strong> {formData.profession}
        </li>
        {formData.profession === "Entrepreneur" && (
          <li>
            <strong>Company:</strong> {formData.company}
          </li>
        )}
        <li>
          <strong>Address:</strong> {formData.addressLine1}
        </li>
        <li>
          <strong>Country:</strong> {formData.country}
        </li>
        <li>
          <strong>State:</strong> {formData.state}
        </li>
        <li>
          <strong>City:</strong> {formData.city}
        </li>
        <li>
          <strong>Plan:</strong> {formData.plan}
        </li>
        <li>
          <strong>Newsletter:</strong> {formData.newsletter ? "Yes" : "No"}
        </li>
        {preview && (
          <li>
            <img src={preview} alt="Preview" width="100" />
          </li>
        )}
      </ul>
      {/* {onBack && <button onClick={onBack}>⬅ Back</button>} */}
      {onSubmit && <button onClick={onSubmit}>✅ Submit</button>}
    </>
  );
}

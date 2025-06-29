import React from "react";

export default function Step1Personal({
  formData,
  handleChange,
  preview,
  errors,
}) {
  return (
    <>
      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <div style={{color:'red'}}>{errors.username}</div>

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <div style={{color:'red'}}>{errors.email}</div>

      <input
        type="password"
        name="password"
        placeholder="Current Password"
        value={formData.password}
        onChange={handleChange}
      />
      <div style={{color:'red'}}>{errors.password}</div>

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={formData.newPassword}
        onChange={handleChange}
      />
      <div style={{color:'red'}}>{errors.newPassword}</div>

      <input name="profileImage" type="file" onChange={handleChange} />
      {preview && <img src={preview} alt="preview" width="100" />}
      <div style={{color:'red'}}>{errors.profileImage}</div>
    </>
  );
}

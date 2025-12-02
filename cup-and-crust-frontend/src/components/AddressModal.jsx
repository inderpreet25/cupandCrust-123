import React, { useState } from "react";
import "./AddressModal.css";

export default function AddressModal({ close, onSubmit }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    house: "",
    area: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitAddress = () => {
    if (!form.fullName || !form.phone || !form.house || !form.area || !form.city || !form.pincode) {
      alert("Please fill all fields");
      return;
    }

    onSubmit(form);
    close();
  };

  return (
    <div className="address-modal-overlay">
      <div className="address-modal-box">
        <h2>Enter Delivery Address</h2>

        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
        <input type="text" name="house" placeholder="House No." onChange={handleChange} />
        <input type="text" name="area" placeholder="Area / Street" onChange={handleChange} />
        <input type="text" name="city" placeholder="City" onChange={handleChange} />
        <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} />

        <div className="btn-row">
          <button className="btn" onClick={submitAddress}>Save & Place Order</button>
          <button className="btn cancel-btn" onClick={close}>Cancel</button>
        </div>

      </div>
    </div>
  );
}

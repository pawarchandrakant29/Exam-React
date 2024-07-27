import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CrudAction';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addItem(formData));
    navigate('/read'); 
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Phone No.:</label>
          <input
            type="tel"
            name="phone"
            placeholder="123 456 7890"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Email ID:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Your Message:</label>
          <textarea
            name="message"
            rows="5"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Create;

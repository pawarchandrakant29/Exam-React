import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem, fetchItems } from '../redux/CrudAction';

const Update = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const items = useSelector((state) => state.crud.items);
  const item = items.find((item) => item.id === Number(id));
  const status = useSelector((state) => state.crud.status);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!item) {
          await dispatch(fetchItems()); 
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [item, dispatch]);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        email: item.email,
        phone: item.phone,
        message: item.message
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateItem({ id: Number(id), ...formData }));
      navigate('/read');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (loading || status === 'loading') return <p>Loading...</p>;

  if (!item) return <p>Item not found</p>;

  return (
    <div>
      <h1>Update Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;

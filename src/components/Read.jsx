import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchItems, deleteItem } from '../redux/CrudAction'; 
import './Read.css'; 

const Read = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.crud.items);
  const status = useSelector((state) => state.crud.status);
  const error = useSelector((state) => state.crud.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteItem(id));
  };

  return (
    <div className="container">
      <div className="header">
        <Link to="/" className="home-button">Home</Link>
      </div>
      <h1 className='black'>Post Details</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <div className="items-container">
          {items.map((item) => (
            <div className="item-card" key={item.id}>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>Message:</strong> {item.message}</p>
              <div className="buttons">
                <Link to={`/update/${item.id}`} className="update-button">Update</Link>
                <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {status === 'failed' && <p>{error}</p>}
    </div>
  );
};

export default Read;

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../redux/CrudAction';

const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const performDelete = async () => {
      const numericId = parseInt(id, 10); 
      if (!isNaN(numericId)) {
        try {
          await dispatch(deleteItem(numericId));
          navigate('/read'); 
        } catch (error) {
          console.error('Failed to delete item:', error);
        }
      } else {
        console.error('Invalid ID:', id);
      }
    };

    performDelete();
  }, [dispatch, id, navigate]);

  return (
    <div>
      <h1>Delete</h1>
      <p>Deleting item...</p>
    </div>
  );
};

export default Delete;

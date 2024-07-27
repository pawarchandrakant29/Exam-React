import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItems = createAsyncThunk('crud/fetchItems', async () => {
  const response = await fetch('http://localhost:5000/items');
  return response.json();
});

export const addItem = createAsyncThunk('crud/addItem', async (newItem) => {
  const response = await fetch('http://localhost:5000/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  });
  return response.json();
});

export const updateItem = createAsyncThunk('crud/updateItem', async (updatedItem) => {
  const response = await fetch(`http://localhost:5000/items/${updatedItem.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedItem),
  });
  return response.json();
});

export const deleteItem = createAsyncThunk('crud/deleteItem', async (id) => {
  const response = await fetch(`http://localhost:5000/items/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete item');
  }

  return id;
});

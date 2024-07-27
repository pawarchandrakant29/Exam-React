import { configureStore } from '@reduxjs/toolkit';
import crudReducer from './redux/CrudReducer';

export const store = configureStore({
  reducer: {
    crud: crudReducer,
  },
});

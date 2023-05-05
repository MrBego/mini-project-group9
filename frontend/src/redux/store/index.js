import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice'
import userDataReducer from '../slice/userDataSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userDataReducer
  },
});

export default store;
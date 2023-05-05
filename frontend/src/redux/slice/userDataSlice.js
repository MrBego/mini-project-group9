import { createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
      user: []
    },
    reducers: {
      storeUserData: (state, action) => {
        state.user.push(action.payload)
      },
      clearUserData: (state, action) => {
        state.user = []
      }
    }
  })
  

  export const { storeUserData, clearUserData } = userDataSlice.actions
  export default userDataSlice.reducer
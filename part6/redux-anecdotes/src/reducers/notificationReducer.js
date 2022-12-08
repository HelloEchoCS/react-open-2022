import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  timeoutId: undefined,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload;
    },
    clear(state, action) {
      return initialState;
    }
  }
})

export default notificationSlice.reducer;
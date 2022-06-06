import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'access_token',
  initialState: {
    access_token: null,
  },
  reducers: {
      setUserToken: (state, action) => { state.access_token = action.payload.access_token; },
      unsetUserToken: (state, action) => { state.access_token = action.payload.access_token; }
  },
})
export const { setUserToken, unsetUserToken } = authSlice.actions

export default authSlice.reducer
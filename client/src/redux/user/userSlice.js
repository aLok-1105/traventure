import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('currentUser');
        }
    }
})

export const {
    updateStart,
    updateSuccess,
    updateFailure,
    signInStart,
    signInSuccess,
    signInFailure,
    signoutSuccess
} = userSlice.actions;

export default userSlice.reducer;

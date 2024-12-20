import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    session_key: null,
    username: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        login(state, action) {
            state.sessionKey = action.payload.session_key;
            state.username = action.payload.username;
        },
        logout(state) {
            state.session_key = null;
            state.username = null;
        },
    },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
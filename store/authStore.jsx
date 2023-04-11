import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { tokenKey, userKey } from "../utils/constants"

const initState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        initialiseAuthState: state => {
            const user = Cookies.get(userKey) ? JSON.parse(Cookies.get(userKey)) : null;
            const token = Cookies.get(tokenKey);
            state.user = user;
            state.token = token;
            return state;
        },
        setUser: (state, {payload}) => {
            Cookies.set(userKey, JSON.stringify(payload.user));
            Cookies.set(tokenKey, payload.token);
            state.user = payload.user;
            state.token = payload.token;
            return state;
        },
        clearUser: state => {
            Cookies.remove(userKey);
            Cookies.remove(tokenKey);
            state.user = initState.user;
            state.token = initState.token;
            return state;
        }
    },
    extraReducers: {}
})

export const {initialiseAuthState, clearUser, setUser} = authSlice.actions;

export default authSlice
import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authStore"

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
})
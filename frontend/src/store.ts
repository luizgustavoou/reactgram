import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice"
import userReducer from "./slices/userSlice";
import photoReducer from "./slices/photoSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        photo: photoReducer,
    },

})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
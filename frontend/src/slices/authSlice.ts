import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authService } from "../services";

const user = JSON.parse(localStorage.getItem("user"));


// Define a type for the slice state
export interface AuthState {
    user: null | any,
    error: boolean | null | any,
    success: boolean | null,
    loading: boolean | null
}

// Define the initial state using that type
const initialState: AuthState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false
}

export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    const data = await authService.register(user);

    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;

        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(register.rejected, (state, action) => {
            state.loading
                = false;
            state.error = action.payload;
            state.user = null;
        })
    }
})

export const { reset, } = authSlice.actions;

export default authSlice.reducer;
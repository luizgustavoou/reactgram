// ações executadas baseado nas requisiçoes que tem em services

// terá açao de registro e dispará varios estado como estaod de loading, sucesso (a resposta que vem da api)

// no slice onde tem a possibilidade de pegar o estado de loading, success, error e nesses intervalo pode fazer manipualçoes de objetos de componenets

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authService } from "../services";
import { IAuthRegister } from "../interfaces/IAuthRegister";


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

//ler: https://redux-toolkit.js.org/usage/usage-with-typescript
export const register = createAsyncThunk("auth/register", async (user: IAuthRegister, thunkAPI) => {
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
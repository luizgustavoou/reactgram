// ações executadas baseado nas requisiçoes que tem em services

// terá açao de registro e dispará varios estado como estaod de loading, sucesso (a resposta que vem da api)

// no slice onde tem a possibilidade de pegar o estado de loading, success, error e nesses intervalo pode fazer manipualçoes de objetos de componenets

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authService, storage } from "../services";
import { IAuthRegister } from "../interfaces/IAuthRegister";
import { IAuthRegisterResponse } from "../repositories/auth/IAuthRegisterResponse";
import { AppDispatch, RootState } from "../store";


const user = JSON.parse(storage.getItem("user"));


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


export const register = createAsyncThunk<IAuthRegisterResponse, IAuthRegister, {
    dispatch: AppDispatch
    state: RootState
}>("auth/register", async (user, thunkAPI) => {
    try {
        const data = await authService.register(user);


        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }

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
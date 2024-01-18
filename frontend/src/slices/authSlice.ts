// ações executadas baseado nas requisiçoes que tem em services

// terá açao de registro e dispará varios estado como estaod de loading, sucesso (a resposta que vem da api)

// no slice onde tem a possibilidade de pegar o estado de loading, success, error e nesses intervalo pode fazer manipualçoes de objetos de componenets


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authService, storage } from "../services";
import { IAuthRegister } from "../interfaces/IAuthRegister";
import { IAuthRegisterResponse } from "../repositories/auth/IAuthRegisterResponse";
import { AppDispatch, RootState } from "../store";
import { IAuthLoginResponse } from "../repositories/auth/IAuthLoginResponse";
import { IAuthLogin } from "../interfaces/IAuthLogin";



const user = JSON.parse(storage.getItem("user"));


// Define a type for the slice state
export interface AuthState {
    user: { "_id": string, token: string } | null,
    error: string | null,
    status: "idle" | "loading" | "success" | "error";
}

// Define the initial state using that type
const initialState: AuthState = {
    user: user ? user : null,
    error: null,
    status: "idle"
}


export const register = createAsyncThunk<IAuthRegisterResponse, IAuthRegister, {
    dispatch: AppDispatch
    state: RootState
    rejectValue: string
}>("auth/register", async (data, thunkAPI) => {
    try {
        const res = await authService.register(data);


        if (res.errors) {
            return thunkAPI.rejectWithValue(res.errors[0]);
        }

        return res;

    } catch (error) {
        return thunkAPI.rejectWithValue((<any>error).message);
    }

})

export const login = createAsyncThunk<IAuthLoginResponse, IAuthLogin, {
    dispatch: AppDispatch
    state: RootState
    rejectValue: string
}>("auth/login", async (data, thunkAPI) => {
    try {
        const res = await authService.login(data);


        if (res.errors) {
            return thunkAPI.rejectWithValue(res.errors[0]);
        }

        return res;

    } catch (error) {
        return thunkAPI.rejectWithValue((<any>error).message);
    }

})

export const logout = createAsyncThunk<void, void, { rejectValue: string }>("auth/logot", async (_, thunkAPI) => {
    try {
        await authService.logout();
    } catch (error) {
        return thunkAPI.rejectWithValue("Houve algum erro ao fazer logout.");
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.status = "idle";

        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.status = "loading";
        }).addCase(register.fulfilled, (state, action) => {
            state.status = "success";
            state.user = action.payload;
        }).addCase(register.rejected, (state, action) => {
            state.status = "error";
            state.user = null;
            state.error = action.payload as string;
        }).addCase(logout.fulfilled, (state, action) => {
            state.status = "success";
            state.user = null;
        }).addCase(login.pending, (state) => {
            state.status = "loading";
        }).addCase(login.fulfilled, (state, action) => {
            state.status = "success";
            state.user = action.payload;
        }).addCase(login.rejected, (state, action) => {
            state.status = "error";
            state.user = null;
            state.error = action.payload as string;

        })


    }
})


export const { reset, } = authSlice.actions;

export default authSlice.reducer;
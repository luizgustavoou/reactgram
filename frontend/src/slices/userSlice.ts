import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface UserState {
    user: any | null
    status: "initial" | "success" | "error" | "loading",
    message: string | null
}

const initialState: UserState = {
    user: null,
    status: "initial",
    message: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.status = "initial";
            state.message = null
        }
    }
});


export const { resetMessage } = userSlice.actions
export default userSlice.reducer;
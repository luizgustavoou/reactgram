import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface UserState {
    user: any | null
    status: "idle" | "success" | "error" | "loading",
    message: string | null
}

const initialState: UserState = {
    user: null,
    status: "idle",
    message: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.status = "idle";
            state.message = null
        }
    }
});


export const { resetMessage } = userSlice.actions
export default userSlice.reducer;
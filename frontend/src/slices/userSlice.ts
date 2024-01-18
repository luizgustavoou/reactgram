import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserGetProfileResponse } from "../repositories/user/IUserGetProfileResponse";
import { AppDispatch, RootState } from "../store";
import { userService } from "../services";

export interface UserState {
  user: IUserGetProfileResponse | null;
  status: "initial" | "success" | "error" | "loading";
  message: string | null;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "initial",
  message: null,
  error: null,
};

export const getProfile = createAsyncThunk<
  IUserGetProfileResponse,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("/user/profile", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;

    const res = await userService.getProfile(token as string);

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.status = "initial";
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
    //   .addCase(getProfile.rejected, (state, action) => {
    //     state.status = "error";
    //     state.user = null;
    //     state.error = action.payload as string;
    //   });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;

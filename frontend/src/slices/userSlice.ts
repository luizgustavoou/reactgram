import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserGetProfileResponse } from "../repositories/user/IUserGetProfileResponse";
import { AppDispatch, RootState } from "../store";
import { userService } from "../services";
import { IUserUpdateProfile } from "../interfaces/IUserUpdateProfile";
import { IUserUpdateProfileResponse } from "../repositories/user/IUserUpdateProfileResponse";

export interface UserState {
  user: IUserGetProfileResponse | null;
  status: "initial" | "success" | "error" | "loading";
  message: string | null;
  errorMessage: string | null;
}

const initialState: UserState = {
  user: null,
  status: "initial",
  message: null,
  errorMessage: null,
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

    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateProfile = createAsyncThunk<
  IUserUpdateProfileResponse,
  IUserUpdateProfile,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("/user/update", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;

    const res = await userService.updateProfile(data, token as string);

    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

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
      //     state.error = action.payload as string;
      //     state.user = null;
      //   });
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.message = "Usuário atualizado com sucesso.";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "error";
        state.errorMessage = action.payload as string;
        state.user = null;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;

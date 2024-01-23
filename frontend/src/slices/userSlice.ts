import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { userService } from "../services";
import { IUserUpdateProfile } from "../interfaces/IUserUpdateProfile";
import { IUser } from "../services/user/models/IUser";

export interface UserState {
  user: IUser | null;
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

export const getProfileByToken = createAsyncThunk<
  IUser,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("/user/profile", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;

    const res = await userService.getProfileByToken(token as string);

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getProfileById = createAsyncThunk<
  IUser,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("/user/get", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;

    const res = await userService.getProfileById(id, token as string);

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateProfile = createAsyncThunk<
  IUser,
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
      .addCase(getProfileByToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfileByToken.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      //   .addCase(getProfileByToken.rejected, (state, action) => {
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
      })
      .addCase(getProfileById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPhoto } from "../services/photo/models/IPhoto";
import { IPublishPhoto } from "../interfaces/IPublishPhoto";
import { AppDispatch, RootState } from "../store";
import { photoService } from "../services";

export interface PhotoState {
  status: "initial" | "success" | "error" | "loading";
  photo: IPhoto | null;
  photos: IPhoto[];
  messsage: string | null;
  // errorMessage: string | null;
}

export const publishPhoto = createAsyncThunk<
  IPhoto,
  IPublishPhoto,
  { dispatch: AppDispatch; state: RootState; rejectValue: string }
>("photo/publish", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;

    const res = await photoService.publishPhoto(data, token as string);

    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState: PhotoState = {
  status: "initial",
  photo: null,
  photos: [],
  messsage: null,
};

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.messsage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.status = "success";
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.messsage = "Foto publicada com sucesso.";
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.status = "error";
        state.messsage = action.payload as string;
        state.photo = null;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;

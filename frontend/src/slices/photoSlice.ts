import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPhoto } from "../services/photo/models/IPhoto";
import { IPublishPhoto } from "../interfaces/IPublishPhoto";
import { AppDispatch, RootState } from "../store";
import { photoService } from "../services";
import { IGetPhotosByUserId } from "../interfaces/IGetPhotosByUserId";
import { IDeletePhoto } from "../interfaces/IDeletePhoto";
import { IUpdatePhoto } from "../interfaces/IUpdatePhoto";
import { IGetPhotoById } from "../interfaces/IGetPhotoById";

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

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getPhotosByUserId = createAsyncThunk<
  IPhoto[],
  IGetPhotosByUserId,
  { dispatch: AppDispatch; state: RootState; rejectValue: string }
>("photo/userphotos", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;

    const res = await photoService.getPhotosByUserId(data, token as string);

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deletePhoto = createAsyncThunk<
  { id: string; message: string },
  IDeletePhoto,
  { dispatch: AppDispatch; state: RootState; rejectValue: string }
>("photo/delete", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;

    const res = await photoService.deletePhoto(data, token as string);

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updatePhoto = createAsyncThunk<
  IPhoto,
  IUpdatePhoto,
  { dispatch: AppDispatch; state: RootState; rejectValue: string }
>("photo/update", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;

    const res = await photoService.updatePhoto(data, token as string);

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getPhotoById = createAsyncThunk<
  IPhoto,
  IGetPhotoById,
  { dispatch: AppDispatch; state: RootState; rejectValue: string }
>("photo/getphoto", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;

    const res = await photoService.getPhotoById(data, token as string);

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
      state.status = "initial";
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
      })
      .addCase(getPhotosByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPhotosByUserId.fulfilled, (state, action) => {
        state.status = "success";
        state.photos = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.status = "success";

        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        });
        state.messsage = action.payload.message;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.status = "error";
        state.messsage = action.payload as string;
        state.photo = null;
      })
      .addCase(updatePhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.status = "success";
        state.photo = action.payload;
        state.photos = state.photos.map((photo) => {
          if (photo._id != action.payload._id) return photo;

          return action.payload;
        });

        state.messsage = "Foto atualizada com sucesso.";
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.status = "error";
        state.messsage = action.payload as string;
        state.photo = null;
      })
      .addCase(getPhotoById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPhotoById.fulfilled, (state, action) => {
        state.status = "success";
        state.photo = action.payload;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;

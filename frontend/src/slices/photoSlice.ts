import { createSlice } from "@reduxjs/toolkit";

export interface PhotoState {
  status: "initial" | "success" | "error" | "loading";
  photo: any | null;
  photos: any[];
  messsage: string | null;
}

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
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;

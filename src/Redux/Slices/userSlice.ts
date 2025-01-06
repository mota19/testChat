import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  userId: string;
  chatId: string;
  first_name: string;
  last_name: string;
}

const initialState: initialState = {
  userId: "",
  chatId: "",
  first_name: "",
  last_name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changechatId: (
      state,
      action: PayloadAction<{ userId: string; chatId: string }>
    ) => {
      state.chatId = action.payload.chatId;
      state.userId = action.payload.userId;
    },
    changeName: (
      state,
      action: PayloadAction<{ first_name: string; last_name: string }>
    ) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
    },
  },
});

export default userSlice.reducer;

export const { changechatId, changeName } = userSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/event.type";

interface IInitialState {
  selectedUser: IUser;
  users: IUser[];
}

const initialState: IInitialState = {
  selectedUser: {
    id: 0,
    avatar: "",
    profilePictures: [],
    description: "",
    partner: "",
    address: "",
    location: {
      lat: "",
      lng: "",
    },
  },
  users: [
    {
      id: 0,
      avatar: "",
      profilePictures: [],
      description: "",
      partner: "",
      address: "",
      location: {
        lat: "",
        lng: "",
      },
    },
  ],
};
export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.selectedUser = action.payload;
    },
    setUserList(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
  },
});

export const { setUser, setUserList } = userReducer.actions;
export default userReducer.reducer;

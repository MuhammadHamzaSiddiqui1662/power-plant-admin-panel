import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, UserStatus } from "../../types/user";
import { getUsers } from "../../services/user";

export interface UserState {
  users: User[];
  approvedBrokers: User[];
  unApprovedBrokers: User[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  approvedBrokers: [],
  unApprovedBrokers: [],
  isLoading: false,
  error: "",
};

export const getUsersThunk = createAsyncThunk("user/get-all", async () => {
  const ips = await getUsers();
  return ips;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIPs: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUsersThunk.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        console.log("Data received in Redux:", action.payload); // Debugging
        state.users = action.payload;
        state.approvedBrokers = action.payload.filter(
          (user) => user.brokerStatus && user.brokerStatus === UserStatus.Active
        );
        state.unApprovedBrokers = action.payload.filter(
          (user) =>
            user.brokerStatus && user.brokerStatus === UserStatus.Pending
        );
        state.isLoading = false;
      }
    );
  },
});

export const { setIPs } = userSlice.actions;

export default userSlice.reducer;

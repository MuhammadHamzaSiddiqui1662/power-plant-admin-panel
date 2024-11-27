import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserStatus } from "../../types/user";
import {
  getUserHirings,
  getUsers,
  updateBrokerStatus,
  updateUser,
  deleteUser,
} from "../../services/user";

export interface UserState {
  users: User[];
  approvedBrokers: User[];
  unApprovedBrokers: User[];
  suspendedBrokers: User[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  approvedBrokers: [],
  unApprovedBrokers: [],
  suspendedBrokers: [],
  isLoading: false,
  error: "",
};

export const getUsersThunk = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("user/get-all", async (_, { rejectWithValue }) => {
  try {
    const users = await getUsers();
    return users;
  } catch (error) {
    return rejectWithValue("Failed to fetch users");
  }
});

export const updateBrokerThunk = createAsyncThunk<
  User,
  { id: string; status: string },
  { rejectValue: string }
>(
  "user/update-broker",
  async ({ id, status }, { rejectWithValue, dispatch }) => {
    try {
      const updatedUser = await updateBrokerStatus(id, status);
      dispatch(getUsersThunk());
      return updatedUser;
    } catch (error) {
      return rejectWithValue("Failed to update broker");
    }
  }
);

export const getUserHiringsThunk = createAsyncThunk(
  "user/user's-brokers",
  async (id: string, { rejectWithValue }) => {
    try {
      const hirings = await getUserHirings(id);
      return hirings;
    } catch (error) {
      return rejectWithValue("Failed to approve broker");
    }
  }
);

export const deleteUserThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("user/delete-user", async (id, { rejectWithValue, dispatch }) => {
  try {
    await deleteUser(id);
    dispatch(getUsersThunk());
    return "User deleted successfully";
  } catch (error) {
    return rejectWithValue("Failed to delete user");
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIPs: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
        state.approvedBrokers = action.payload.filter(
          (user) => user.brokerStatus === UserStatus.Active
        );
        state.unApprovedBrokers = action.payload.filter(
          (user) => user.brokerStatus === UserStatus.Pending
        );
        state.suspendedBrokers = action.payload.filter(
          (user) => user.brokerStatus === UserStatus.Suspended
        );
        state.isLoading = false;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const updateUserThunk = createAsyncThunk<
  User,
  { id: string; data: Partial<User> },
  { rejectValue: string }
>("user/update-user", async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const updatedUser = await updateUser(id, data);
    dispatch(getUsersThunk());
    return updatedUser;
  } catch (error) {
    return rejectWithValue("Failed to update user");
  }
});

export const { setIPs } = userSlice.actions;

export default userSlice.reducer;

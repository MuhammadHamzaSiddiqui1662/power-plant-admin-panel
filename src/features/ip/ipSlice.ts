import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getIPs, publishIp, updateIP } from "../../services/ip";
import { IP } from "../../types/ip";
import { IpStatus } from "../../enums";

export interface IPState {
  ips: IP[];
  activeIPs: IP[];
  pendingIPs: IP[];
  archivedIPs: IP[];
  draftIPs: IP[];
  isLoading: boolean;
  error: string;
}

const initialState: IPState = {
  ips: [],
  activeIPs: [],
  pendingIPs: [],
  archivedIPs: [],
  draftIPs: [],
  isLoading: false,
  error: "",
};

export const getIPsThunk = createAsyncThunk("ip/get-all", async () => {
  const ips = await getIPs();
  return ips;
});

export const publishIpThunk = createAsyncThunk(
  "ip/publish",
  async (ipId: string) => {
    const { result } = await publishIp(ipId);
    return result;
  }
);

export const updateIPDetailsThunk = createAsyncThunk(
  "ip/update-details",
  async ({ ipId, details }: { ipId: string; details: Partial<IP> }) => {
    const { result } = await updateIP(ipId, details as any);
    return result;
  }
);

export const ipSlice = createSlice({
  name: "ip",
  initialState,
  reducers: {
    setIPs: (state, action: PayloadAction<IP[]>) => {
      state.ips = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getIPsThunk.fulfilled,
      (state, action: PayloadAction<IP[]>) => {
        console.log("Data received in Redux:", action.payload); // Debugging
        state.ips = action.payload;
        state.activeIPs = action.payload.filter(
          (ip) => ip.status === IpStatus.Published
        );
        state.pendingIPs = action.payload.filter(
          (ip) => ip.status === IpStatus.AppliedForPatent
        );
        state.archivedIPs = action.payload.filter(
          (ip) => ip.status === IpStatus.InActive
        );
        state.draftIPs = action.payload.filter(
          (ip) => ip.status === IpStatus.Draft
        );
        state.isLoading = false;
      }
    );
  },
});

export const { setIPs } = ipSlice.actions;

export default ipSlice.reducer;

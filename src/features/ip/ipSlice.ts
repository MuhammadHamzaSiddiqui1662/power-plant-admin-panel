import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { deleteIP, getIPs, publishIp, updateIP } from "../../services/ip";
import { IP } from "../../types/ip";
import { IpStatus } from "../../enums";
import { api } from "../../config/axios";

export interface IPState {
  ips: IP[];
  publishedIPs: IP[];
  appliedForPatentIPs: IP[];
  inActiveIPs: IP[];
  draftIPs: IP[];
  pendingIPs: IP[];
  isLoading: boolean;
  error: string;
}

const initialState: IPState = {
  ips: [],
  publishedIPs: [],
  appliedForPatentIPs: [],
  inActiveIPs: [],
  draftIPs: [],
  pendingIPs: [],
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

export const getUserPersonalIps = createAsyncThunk(
  "ip/get-user-ips",
  async (userId: string) => {
    const data = await getIPs(`?userId=${userId}`);
    return data;
  }
);

export const patentIpThunk = createAsyncThunk(
  "ip/get-user-ips",
  async (ip: any) => {
    const data = await api.put(`/ips`, ip);
    console.log(data);
    return data;
  }
);

export const updateIPThunk = createAsyncThunk<
  IP,
  { ipId: string; data: Partial<IP> }
>("ip/update", async ({ ipId, data }) => {
  const { result } = await updateIP(ipId, data);
  return result;
});

export const deleteIPThunk = createAsyncThunk(
  "ip/delete",
  async (ipId: string) => {
    await deleteIP(ipId);
    return ipId;
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
    builder
      .addCase(getIPsThunk.fulfilled, (state, action: PayloadAction<IP[]>) => {
        state.ips = action.payload;
        state.publishedIPs = action.payload.filter(
          (ip) => ip.status === IpStatus.Published
        );
        state.appliedForPatentIPs = action.payload.filter(
          (ip) => ip.status === IpStatus.AppliedForPatent
        );
        state.inActiveIPs = action.payload.filter(
          (ip) => ip.status === IpStatus.InActive
        );
        state.draftIPs = action.payload.filter(
          (ip) => ip.status === IpStatus.Draft
        );
        state.pendingIPs = action.payload.filter(
          (ip) => ip.status === IpStatus.Pending
        );
        state.isLoading = false;
      })
      .addCase(
        deleteIPThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          const deletedIpId = action.payload; // The deleted IP ID
          state.ips = state.ips.filter((ip) => ip._id !== deletedIpId);
          state.publishedIPs = state.publishedIPs.filter(
            (ip) => ip._id !== deletedIpId
          );
          state.appliedForPatentIPs = state.appliedForPatentIPs.filter(
            (ip) => ip._id !== deletedIpId
          );
          state.inActiveIPs = state.inActiveIPs.filter(
            (ip) => ip._id !== deletedIpId
          );
          state.draftIPs = state.draftIPs.filter(
            (ip) => ip._id !== deletedIpId
          );
          state.pendingIPs = state.pendingIPs.filter(
            (ip) => ip._id !== deletedIpId
          );
        }
      )
      .addCase(updateIPThunk.fulfilled, (state, action: PayloadAction<IP>) => {
        const index = state.ips.findIndex(
          (ip) => ip._id === action.payload._id
        );
        if (index !== -1) {
          state.ips[index] = action.payload;
        } else {
          console.log("IP not found in state:", action.payload._id);
        }
      });
  },
});

export const { setIPs } = ipSlice.actions;

export default ipSlice.reducer;

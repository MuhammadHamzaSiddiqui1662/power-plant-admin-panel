// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import {
//   approveSaleDeed,
//   getSaleDeed,
//   scheduleMeeting,
// } from "../../services/saleDeed";
// import { SaleDeedStatus } from "../../enums";
// import { SaleDeed } from "../../types/saleDeed";

// export interface SaleDeedState {
//   saleDeeds: SaleDeed[];
//   pendingSaleDeeds: SaleDeed[];
//   inProgressSaleDeeds: SaleDeed[];
//   cityCourt: SaleDeed[];
//   transferred: SaleDeed[];
//   isLoading: boolean;
//   error: string;
// }

// const initialState: SaleDeedState = {
//   saleDeeds: [],
//   pendingSaleDeeds: [],
//   inProgressSaleDeeds: [],
//   cityCourt: [],
//   transferred: [],
//   isLoading: true,
//   error: "",
// };

// export const getSaleDeedsThunk = createAsyncThunk(
//   "saleDeed/get-all",
//   async () => {
//     const { result } = await getSaleDeed();
//     return result;
//   }
// );

// export const approveSaleDeedThunk = createAsyncThunk(
//   "saleDeed/approve",
//   async (saleDeedId: number) => {
//     const { result } = await approveSaleDeed(saleDeedId);
//     return result;
//   }
// );

// export const scheduleMeetingThunk = createAsyncThunk(
//   "saleDeed/schedule-meeting",
//   async ({
//     saleDeedId,
//     meetingDate,
//   }: {
//     saleDeedId: number;
//     meetingDate: string;
//   }) => {
//     const { result } = await scheduleMeeting(saleDeedId, meetingDate);
//     return result;
//   }
// );

// export const saleDeedSlice = createSlice({
//   name: "saleDeed",
//   initialState,
//   reducers: {
//     setSaleDeeds: (state, action: PayloadAction<SaleDeed[]>) => {
//       state.saleDeeds = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // getSaleDeeds
//       .addCase(getSaleDeedsThunk.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getSaleDeedsThunk.rejected, (state) => {
//         state.error = "Error while loading saledeeds";
//         state.isLoading = false;
//       })
//       .addCase(
//         getSaleDeedsThunk.fulfilled,
//         (state, action: PayloadAction<SaleDeed[]>) => {
//           state.saleDeeds = action.payload;
//           state.pendingSaleDeeds = action.payload.filter(
//             (deed) =>
//               deed.saleDeedStatus === SaleDeedStatus.WaitingRegistrarApproval
//           );
//           state.inProgressSaleDeeds = action.payload.filter(
//             (deed) => deed.saleDeedStatus === SaleDeedStatus.MeetingSchedule
//           );
//           state.cityCourt = action.payload.filter(
//             (deed) => deed.saleDeedStatus === SaleDeedStatus.CityCourt
//           );
//           state.transferred = action.payload.filter(
//             (deed) => deed.saleDeedStatus === SaleDeedStatus.Transferred
//           );
//           state.isLoading = false;
//         }
//       )
//       // schedule meeting
//       .addCase(scheduleMeetingThunk.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(scheduleMeetingThunk.rejected, (state) => {
//         state.error = "Error while scheduling meeting";
//         state.isLoading = false;
//       })
//       .addCase(scheduleMeetingThunk.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       // approve
//       .addCase(approveSaleDeedThunk.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(approveSaleDeedThunk.rejected, (state) => {
//         state.error = "Error while approving saledeeds";
//         state.isLoading = false;
//       })
//       .addCase(approveSaleDeedThunk.fulfilled, (state) => {
//         state.isLoading = false;
//       });
//   },
// });

// // Action creators are generated for each case reducer function
// export const { setSaleDeeds } = saleDeedSlice.actions;

// export default saleDeedSlice.reducer;

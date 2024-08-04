import { combineSlices } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { saleDeedSlice } from "./saleDeed/saleDeedSlice";
import { ipSlice } from "./ip/ipSlice";

export const rootReducer = combineSlices(authSlice, saleDeedSlice, ipSlice);

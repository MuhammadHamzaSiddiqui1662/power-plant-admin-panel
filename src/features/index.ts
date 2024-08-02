import { combineSlices } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { saleDeedSlice } from "./saleDeed/saleDeedSlice";

export const rootReducer = combineSlices(authSlice, saleDeedSlice);

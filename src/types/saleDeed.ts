import { Dayjs } from "dayjs";
import {
  PlotCategory,
  PlotNature,
  SaleDeedStatus,
  Schemes,
  TransactionType,
} from "../enums";

export interface SaleDeed {
  buyerCnic: string;
  ownerCnic: string;
  plot: Plot;
  saleDeedChalan: SaleDeedChalan;
  saleDeedId: number;
  saleDeedStatus: SaleDeedStatus;
  saleDeedTotalAmount: number;
  transactionType: TransactionType;
}

export interface Plot {
  attorneyCnic: string;
  blockNumber: string;
  onMarketPlace: null;
  plotCategory: PlotCategory;
  plotId: number;
  plotIsCorner: boolean;
  plotNature: PlotNature;
  plotNumber: number;
  plotSize: number;
  scheme: Schemes;
  subAttorneyCnic: string;
  transactionDate: Dayjs;
  transactionType: TransactionType;
}

export interface SaleDeedChalan {
  saleDeedChalanDate: Dayjs;
  saleDeedChalanValue: number;
}

export interface Column {
  id: "id" | "plotId" | "stampValue" | "advanceAmount" | "totalAmount";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

export interface Data {
  id: number;
  plotId: number;
  stampValue: number;
  advanceAmount: number;
  totalAmount: number;
}

import { Data, SaleDeed } from "../types/saleDeed";

export const formatRows = (saleDeeds: SaleDeed[]): Data[] =>
  saleDeeds.map((saleDeed) => ({
    id: saleDeed.saleDeedId,
    plotId: saleDeed.plot.plotId,
    stampValue: saleDeed.saleDeedChalan.saleDeedChalanValue,
    totalAmount: saleDeed.saleDeedTotalAmount,
    advanceAmount: 0,
  }));

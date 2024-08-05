import { Data, SaleDeed } from "../types/saleDeed";
import { IP } from "../types/ip";

export const formatRows = (saleDeeds: SaleDeed[]): Data[] =>
  saleDeeds.map((saleDeed) => ({
    id: saleDeed.saleDeedId,
    plotId: saleDeed.plot.plotId,
    stampValue: saleDeed.saleDeedChalan.saleDeedChalanValue,
    totalAmount: saleDeed.saleDeedTotalAmount,
    advanceAmount: 0,
  }));

export const formatIPRows = (ips: IP[]) => {
  return ips.map((ip) => ({
    id: ip._id,
    name: ip.name,
    price: ip.price,
    status: ip.status,
  }));
};

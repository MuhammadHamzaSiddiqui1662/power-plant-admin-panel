import { IP } from "../types/ip";
import { Review, User } from "../types/user";
import { Hiring } from "../types/hiring";

export const calculateRating = (reviews: Review[]) =>
  reviews.reduce(
    (prev, curr) =>
      prev +
      (curr.priceNegotiation +
        curr.responsiveness +
        curr.communication +
        curr.technicalSkills +
        curr.behaviour) /
        5,
    0
  ) / reviews.length || 0;

export const formatIPRows = (ips: IP[]) => {
  return ips.map((ip) => ({
    _id: ip._id,
    name: ip.name,
    price: ip.price,
    status: ip.status,
  }));
};

export const formatUserRows = (users: User[]) => {
  return users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    status: user.status,
    brokerStatus: user.brokerStatus || "-",
  }));
};

export const formatHiringRows = (hirings: Hiring[]) => {
  return hirings.map((hiring) => ({
    name: hiring.broker.name,
    email: hiring.broker.email,
    ip: hiring.ip.name,
  }));
};

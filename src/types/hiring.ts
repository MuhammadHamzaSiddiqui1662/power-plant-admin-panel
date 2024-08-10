import { IP } from "./ip";
import { User } from "./user";

export interface Hiring {
  investor: User;
  broker: User;
  ip: IP;
}

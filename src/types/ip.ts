import { Dayjs } from "dayjs";
import { IpStatus } from "../enums";

export interface IPSection {
  title: string;
  content: string;
}

export interface IPImage {
  url: string;
  description?: string;
}

export interface IP {
  _id: string;
  name: string;
  description: string;
  abstract: string;
  price: number;
  status: IpStatus;
  categories: string[];
  publishedDate: Dayjs;
  patentNumber?: string;
  trademark?: string;
  copyright?: string;
  mainImg: string;
  images: IPImage[];
  sections: IPSection[];
  userId: string;
}

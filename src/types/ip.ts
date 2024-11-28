import { IpStatus } from "../enums";

export interface IPSection {
  title: string;
  content: string;
}

export interface IP {
  userDetails: any;
  _id: string;
  name: string;
  description: string;
  abstract: string;
  price: number;
  status: IpStatus;
  categories: string[];
  publishedDate: Date;
  patentNumber?: string;
  trademark?: string;
  copyright?: string;
  mainImg: string;
  images: string[];
  sections: IPSection[];
  userId: string;
  patentDocument: string;
}

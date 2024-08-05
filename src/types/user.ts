export interface Admin {
  imageUrl: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
}

export interface Review {
  dealSuccessFul?: boolean;
  comments?: string;
  behaviour: number;
  priceNegotiation: number;
  responsiveness: number;
  communication: number;
  technicalSkills: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Certificate {
  category: string;
  imageUrl: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  about?: string;
  imageUrl?: string;
  identityUrl?: string;
  address?: string;
  status: UserStatus;
  subscriber?: boolean;
  otp?: string;
  otpExpiry?: Date;
  online?: boolean;
  lastSeen?: Date;
  brokerStatus?: UserStatus;
  reviewsAsInvestor?: Review[];
  reviewsAsBorker?: Review[];
  reviewsAsInnovator?: Review[];
  totalBrokersHired?: string;
  dealsInProgress?: string;
  successfulDeals?: string;
  certificates?: Certificate[];
  interests?: string[];
  brokerIdentityUrl?: string;
  notificationsAllowed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum UserStatus {
  Active = "Active",
  Pending = "Pending",
}

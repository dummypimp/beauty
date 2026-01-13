export enum ContactStatus {
  PENDING = 'Pending',
  YES = 'Yes',
  NO = 'No'
}

export interface Contact {
  id: string;
  name: string;
  role: string; // e.g., Makeup Artist, Salon Owner, Influencer
  phone: string;
  location: string;
  instagram: string;
  bio: string;
  isVerified: boolean; // Truecaller verification status
  status: ContactStatus;
  avatarUrl?: string;
}

export interface TruecallerResponse {
  success: boolean;
  isVerified: boolean;
  score: number;
}
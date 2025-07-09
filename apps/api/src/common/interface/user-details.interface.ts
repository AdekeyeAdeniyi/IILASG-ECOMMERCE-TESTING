import { Role } from 'generated/prisma';

export interface UserDetails {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: Role;
  isLagosian: boolean;
  state?: string | null;
}

export interface UserDetailsWithTimestamps extends UserDetails {
  createdAt: Date | string;
  updatedAt: Date | string;
}

import { ZodIssue } from 'zod';

interface Audit {
  userId: string;
}

export interface WorkoutResponse extends Audit {
  _id: string;
  userId: string;
  type: string;
  time: number;
  description: string;
  year: number;
  month: number;
  day: number;
}

export interface WorkoutRequest extends Audit {
  userId: string;
  type: string;
  time: number;
  description: string;
  year: number;
  month: number;
  day: number;
}

export interface WorkoutTypeResponse {
  _id: string;
  name: string;
  subcategory: string;
}

export interface ActionResponse {
  success: boolean;
  errors: ZodIssue[];
}

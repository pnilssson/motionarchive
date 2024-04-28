import { Audit } from './audit';

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

export interface AddWorkoutActionResponse {
  success: boolean;
  errors: any[];
}

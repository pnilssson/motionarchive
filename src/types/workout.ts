import { Audit } from './audit';

export interface WorkoutResponse extends Audit {
  _id: string;
  userId: string;
  type: string;
  subCategory: string;
  time: number;
  description: string;
  date: Date;
}

export interface WorkoutRequest extends Audit {
  userId: string;
  type: string;
  time: number;
  description: string;
  date: Date;
}

export interface AddWorkoutActionResponse {
  success: boolean;
  errors: any[];
}

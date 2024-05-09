import { ZodIssue } from 'zod';

export interface WorkoutResponse {
  _id: string;
  userId: string;
  type: string;
  category: string;
  time: number;
  description: string;
  year: number;
  month: number;
  day: number;
}

export interface WorkoutRequest {
  userId: string;
  type: string;
  category: string;
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

export interface PersonalRecordResponse {
  _id: string;
  userId: string;
  name: string;
  results: PersonalRecordResult[];
}

export interface PersonalRecordResult {
  id: string;
  result: string;
  date: Date;
}

export interface PersonalRecordRequest {
  userId: string;
  name: string;
  results: PersonalRecordResult[];
}

export interface WorkoutResponse {
    _id: string;
    userId: string;
    type: string;
    time: number;
    description: string;
    date: Date;
}

export interface WorkoutRequest {
    userId: string;
    type: string;
    time: number;
    description: string;
    date: Date;
}

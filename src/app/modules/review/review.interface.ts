import { Types } from "mongoose";

export interface IReview extends Document {
  rating: number;
  comment: string;
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ReviewData {
  productId?: string;
  userId?: string;
  rating: number;
  comment: string;
}
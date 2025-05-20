import { Types } from "mongoose";

export interface IReview extends Document {
  rating: number;
  comment: string;
  cropId: Types.ObjectId;
  userId: Types.ObjectId;
  isAnonymous: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ReviewData {
  productId?: string;
  userId?: string;
  rating: number;
  comment: string;
}
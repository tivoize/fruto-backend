import { Model, Types } from 'mongoose'


export interface IUser {
  _id: Types.ObjectId
  email: string
  password: string
  role: 'farmer' | 'buyer' | 'logistics'
  username: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  country?: string

  // Farmer-specific
  farm_name?: string
  farm_size?: string
  produce_types?: string[]

  // Buyer-specific
  company_name?: string
  business_type?: string
  tax_id?: string

  // Logistics-specific
  fleet_size?: string
  vehicle_types?: string[]
  service_areas?: string[]
}

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'email' | 'password' | 'role' | '_id'> | null>

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>

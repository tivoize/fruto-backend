import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import config from '../../../config'
import { Model } from 'mongoose'
import { IUser } from './user.interface'

export interface UserModel extends Model<IUser> {
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password' | 'role' | '_id'> | null>
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser, UserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: { type: String, enum: ['farmer', 'buyer', 'logistics','admin'], required: true },
    username: { type: String, required: true },
    phone: String,
    address: String,
    city: String,
    state: String,
    zip_code: String,
    country: String,

    // Farmer-specific
    farm_name: String,
    farm_size: String,
    produce_types: [String],

    // Buyer-specific
    company_name: String,
    business_type: String,
    tax_id: String,

    // Logistics-specific
    fleet_size: String,
    vehicle_types: [String],
    service_areas: [String],

  },
   {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        return ret
      },
    },
  }
)

// Hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  next()
})

// Check if user exists
UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'email' | 'password' | 'role' | '_id'> | null> {
  return await User.findOne({ email }, { email: 1, password: 1, role: 1 })
}

UserSchema.statics.isVerifiedUserExist = async function (
  id: string
): Promise<Pick<IUser, 'password' | 'role' | 'email' | '_id'> | null> {
  console.log(id)
  return await User.findOne(
    { _id: id },
    { password: 1, role: 1, phoneNumber: 1 }
  )
}


// Compare passwords
UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

export const User = model<IUser, UserModel>('User', UserSchema)

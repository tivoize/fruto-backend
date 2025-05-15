import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find()
  return result
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  return result
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const existingUser = await User.findById(id)

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }

  const updatedUserData: Partial<IUser> = { ...payload }

  if (payload.password) {
    const salt = await bcrypt.genSalt(10)
    updatedUserData.password = await bcrypt.hash(payload.password, salt)
  }

  const result = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  })

  return result
}

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}

const getLoggedUser = async (id: JwtPayload): Promise<Partial<IUser>> => {
  const userId = id;

  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token payload: missing user ID')
  }

  const user = await User.findById(userId)
    .select(
      'username email phone address city state zip_code country role ' +
      'farm_name farm_size produce_types ' +       // farmer
      'company_name business_type tax_id ' +       // buyer
      'fleet_size vehicle_types service_areas'     // logistics
    )
    .lean()

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // Optionally: filter out irrelevant fields by role
  const filteredUser: Partial<IUser> = {
    _id: user._id,
    email: user.email,
    username: user.username,
    phone: user.phone,
    address: user.address,
    city: user.city,
    state: user.state,
    zip_code: user.zip_code,
    country: user.country,
    role: user.role,
  }

  if (user.role === 'farmer') {
    Object.assign(filteredUser, {
      farm_name: user.farm_name,
      farm_size: user.farm_size,
      produce_types: user.produce_types,
    })
  } else if (user.role === 'buyer') {
    Object.assign(filteredUser, {
      company_name: user.company_name,
      business_type: user.business_type,
      tax_id: user.tax_id,
    })
  } else if (user.role === 'logistics') {
    Object.assign(filteredUser, {
      fleet_size: user.fleet_size,
      vehicle_types: user.vehicle_types,
      service_areas: user.service_areas,
    })
  }

  return filteredUser
}

const updateLoggedUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<Partial<IUser> | null> => {
  const existingUser = await User.findById(id)

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }

  const updatedUserData: Partial<IUser> = { ...payload }

  if (payload.password) {
    const salt = await bcrypt.genSalt(10)
    updatedUserData.password = await bcrypt.hash(payload.password, salt)
  }

  const result = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
    fields: {
      username: 1,
      phone: 1,
      address: 1,
      city: 1,
      state: 1,
      zip_code: 1,
      country: 1,
      _id: 1,
    },
  })

  return result
}

export const userService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getLoggedUser,
  updateLoggedUser,
}

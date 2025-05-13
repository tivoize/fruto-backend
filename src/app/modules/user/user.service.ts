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

const getLoggedUser = async (id: JwtPayload): Promise<Partial<IUser> | null> => {
  const result = await User.findById(id, {
    username: 1,
    phone: 1,
    address: 1,
    city: 1,
    state: 1,
    zip_code: 1,
    country: 1,
    _id: 1,
  })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  return result
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

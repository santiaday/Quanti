import UserModel, { IUser } from '@backendTypes/user/userModel';
import EventModel from '@models/events/eventModel';
import { ObjectId } from 'mongoose';

export const findUserByUniqueId = async (uniqueId: string): Promise<IUser | null> => {
    return await UserModel.findOne({ uniqueIds: uniqueId });
  };
  


  export const createUser = async (
    uniqueId: string,
    data: { email?: string; phoneNumber?: string; properties?: any }
  ): Promise<IUser> => {
    const newUser = new UserModel({
      uniqueIds: uniqueId ? [uniqueId] : [],
      email: data.email,
      phoneNumber: data.phoneNumber,
      properties: data.properties,
    });
    return await newUser.save();
  };
  

  export const addUniqueIdToUser = async (
    user: IUser,
    uniqueId: string
  ): Promise<IUser> => {
    if (!user.uniqueIds.includes(uniqueId)) {
      user.uniqueIds.push(uniqueId);
      await user.save();
    }
    return user;
  };
  

  export const findUserByEmailOrPhone = async (
    email?: string,
    phoneNumber?: string
  ): Promise<IUser | null> => {
    const query: any = {};
    if (email) query.email = email;
    if (phoneNumber) query.phoneNumber = phoneNumber;
  
    if (Object.keys(query).length === 0) return null;
  
    return await UserModel.findOne(query);
  };
  
  
  export const mergeUsers = async (
    primaryUser: IUser,
    secondaryUser: IUser
  ): Promise<IUser> => {
    // Merge uniqueIds
    primaryUser.uniqueIds = Array.from(
      new Set([...primaryUser.uniqueIds, ...secondaryUser.uniqueIds])
    );
  
    // Merge email and phoneNumber, keeping the oldest values
    if (!primaryUser.email) {
      primaryUser.email = secondaryUser.email;
    }
    if (!primaryUser.phoneNumber) {
      primaryUser.phoneNumber = secondaryUser.phoneNumber;
    }
  
    // Merge properties, giving precedence to the oldest (primaryUser)
    primaryUser.properties = {
      ...secondaryUser.properties,
      ...primaryUser.properties,
    };
  
    // Save the merged user
    await primaryUser.save();
  
    // Reassign events from secondaryUser to primaryUser
    await EventModel.updateMany(
      { userId: secondaryUser._id },
      { userId: primaryUser._id }
    );
  
    // Delete the secondaryUser
    await UserModel.findByIdAndDelete(secondaryUser._id);
  
    return primaryUser;
  };
  
  

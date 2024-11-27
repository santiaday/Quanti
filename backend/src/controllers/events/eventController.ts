// src/controllers/eventController.ts
import { Request, Response } from 'express';
import { saveEvent, getEvents } from '../../services/events/eventService';
import { IBaseEvent } from '../../types/events/event';
import { extractUrlParametersFromCurrentUrl } from '@utils/manipulation/urlManipulation';
import { findUserByUniqueId, createUser, findUserByEmailOrPhone, mergeUsers, addUniqueIdToUser } from '@services/users/userService';
import { IUser } from '@backendTypes/user/userModel';


export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventData = {
      ...req.body,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      timestamp: new Date(),
    };

    const { uniqueId, email, phoneNumber, properties, currentUrl } = eventData;

    if (currentUrl && properties) {
      eventData.properties = extractUrlParametersFromCurrentUrl(properties, currentUrl);
    }

    let user: IUser | null = null;

    if (uniqueId) {
      user = await findUserByUniqueId(uniqueId);
    }

    if (user) {

      if (email || phoneNumber) {
        const emailOrPhoneUser = await findUserByEmailOrPhone(email, phoneNumber);

        if (
          emailOrPhoneUser &&
          emailOrPhoneUser._id.toString() !== user._id.toString()
        ) {
          user = await mergeUsers(user, emailOrPhoneUser);
        } else {
          if (email && !user.email) {
            user.email = email;
          }
          if (phoneNumber && !user.phoneNumber) {
            user.phoneNumber = phoneNumber;
          }
          await user.save();
        }
      }
    } else {

      if (email || phoneNumber) {
        const emailOrPhoneUser = await findUserByEmailOrPhone(email, phoneNumber);

        if (emailOrPhoneUser) {
          user = await addUniqueIdToUser(emailOrPhoneUser, uniqueId);
        } else {
          user = await createUser(uniqueId, {
            email,
            phoneNumber,
            properties,
          });
        }
      } else {
        user = await createUser(uniqueId, {
          properties,
        });
      }
    }

    if (user) {
      eventData.userId = user._id;
    }
    const event = await saveEvent(eventData);
    res.status(201).json(event);
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const listEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter = req.query || {};
    const events = await getEvents(filter);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

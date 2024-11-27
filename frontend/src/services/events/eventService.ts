import axios from 'axios';
import { IBaseEvent } from '@frontendTypes/events/event';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const getEvents = async (filter: Record<string, any> = {}): Promise<IBaseEvent[]> => {
  const response = await axios.get<IBaseEvent[]>(`${API_URL}/events`, {
    params: filter,
  });
    
    console.log(response.data)
  return response.data;
};

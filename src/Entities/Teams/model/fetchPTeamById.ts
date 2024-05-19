import { LoaderFunction } from 'react-router-dom';
import { getToken } from '@/Features';
import axios from 'axios';
import { PREFIX } from '@/Shared';
import { TeamsInterface } from '@/Entities/Teams/model';

export const fetchTeamById: LoaderFunction = async ({ params }) => {
  try {
    const token = getToken();
    const { data } = await axios.get<TeamsInterface>(`${PREFIX}/api/Team/Get`, {
      params: { id: params.id },
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (err) {
    throw new Error('Ошибка загрузки команды');
  }
};

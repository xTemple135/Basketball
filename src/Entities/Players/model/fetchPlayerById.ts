import { LoaderFunction } from 'react-router-dom';
import { getToken } from '@/Features';
import { PlayerInterface } from './PlayersInterface';
import axios from 'axios';
import { PREFIX } from '@/Shared';

export const fetchPlayerById: LoaderFunction = async ({ params }) => {
    try {
        const token = getToken();
        const { data } = await axios.get<PlayerInterface>(`${PREFIX}/api/Player/Get`, {
            params: { id: params.id },
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    } catch (err) {
        throw new Error('Ошибка загрузки игрока');
    }
};

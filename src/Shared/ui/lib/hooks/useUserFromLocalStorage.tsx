import { AppDispatch } from '@/App/store';
import { loginLocalStorage } from '@/Entities/Auth/AuthSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useUserFromLocalStorage = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (userInfo && userInfo.name) {
      dispatch(loginLocalStorage(userInfo));
    }
  }, [dispatch]);
};

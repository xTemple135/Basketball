import { Layout } from '@/Widgets';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate('/players');
    }
  }, [navigate, location.pathname]);

  return (
    <Layout />
  );
};

export default Main;

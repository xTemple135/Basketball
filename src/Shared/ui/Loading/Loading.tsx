import react from 'react';

import React from 'react';
import { LoadingProps } from './Loading.props';

const Loading:React.FC<LoadingProps>= ({message}) => {
  return <div>{message}</div>;
};

export default Loading;

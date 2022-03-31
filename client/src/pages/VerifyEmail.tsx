import React from 'react';
import { Wrapper } from '../components/Wrapper';

const VerifyEmail: React.FC<{}> = () => {
  return (
    <Wrapper variant='small'>
      Please verify your email. Click the link sent to your email then proceed
      to login.
    </Wrapper>
  );
};

export default VerifyEmail;

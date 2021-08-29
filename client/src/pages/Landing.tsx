import React from 'react';
import { Wrapper } from '../components/Wrapper';

const Landing: React.FC<{}> = () => {
  return (
    <Wrapper variant='small'>
      <div>
        Welcome to Curios! Curios is an engaging Q&A platform for instructors to
        help students learn.
      </div>
    </Wrapper>
  );
};

export default Landing;

import { Box } from '@chakra-ui/react';
import React from 'react';
import { Header } from './Header';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <>
      {/* <Header /> */}
      <Box
        mt={8}
        mx='auto'
        maxW={variant === 'regular' ? '800px' : '400px'}
        w='100%'
      >
        {children}
      </Box>
    </>
  );
};

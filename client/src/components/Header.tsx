import { Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as ReachLink } from 'react-router-dom';
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Flex mt={2}>
      <Text ml={2}>Curios</Text>
      <Flex ml='auto'>
        <Link as={ReachLink} to='/login' mr={2}>
          Login
        </Link>
        <Link as={ReachLink} to='/register' mr={2}>
          Register
        </Link>
      </Flex>
    </Flex>
  );
};

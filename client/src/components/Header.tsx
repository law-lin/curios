import { Button, Flex, Heading, Link, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { Link as ReachLink } from 'react-router-dom';
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex mt={2} align='center'>
      <Heading ml={4} size='lg' fontFamily='helvetica'>
        Curios
      </Heading>
      <Flex ml='auto'>
        <Button mr={8} onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        <Link
          as={ReachLink}
          to='/login'
          style={{ textDecoration: 'none' }}
          mr={2}
        >
          <Button>Login</Button>
        </Link>
        <Link
          as={ReachLink}
          to='/register'
          style={{ textDecoration: 'none' }}
          mr={2}
        >
          <Button>Register</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

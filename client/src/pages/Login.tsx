import React from 'react';
import {
  Heading,
  Box,
  Center,
  Stack,
  Button,
  useColorModeValue,
  Flex,
  Link,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from 'components/InputField';
import { useHistory } from 'react-router-dom';
import useLogin from 'hooks/useLogin';

const Login: React.FC<{}> = () => {
  const history = useHistory();
  const loginMutation = useLogin();

  const handleLogin = async (values) => {
    loginMutation.mutate(values);
  };

  const renderError = () => {
    if (loginMutation.isError) {
      return (loginMutation.error as Error).message;
    }
    return null;
  };

  return (
    <Center py={20}>
      <Box
        w='50%'
        minW='350px'
        maxW='600px'
        py={10}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow='xl'
        rounded='xl'
        overflow='hidden'
        border='1px #40444D solid'
      >
        <Box p={6}>
          <Heading fontSize='3xl' fontWeight='bold' textAlign='center'>
            Login
          </Heading>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLogin}
          >
            {() => (
              <Form>
                <Stack spacing={5} my={10} px={10}>
                  <InputField
                    name='email'
                    placeholder='email'
                    label='Email'
                    type='email'
                  />
                  <Box mt={4}>
                    <InputField
                      name='password'
                      placeholder='password'
                      label='Password'
                      type='password'
                    />
                  </Box>
                  <Flex>
                    <Link ml='auto' mt={2}>
                      Forgot Password?
                    </Link>
                  </Flex>
                </Stack>
                {renderError()}
                <Center>
                  <Button
                    type='submit'
                    w='30%'
                    colorScheme='teal'
                    rounded='md'
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                      backgroundColor: 'teal.500'
                    }}
                  >
                    Login
                  </Button>
                </Center>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Center>
  );
};

export default Login;

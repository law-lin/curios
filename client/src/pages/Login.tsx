import React from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from 'components/InputField';
import { Wrapper } from 'components/Wrapper';
import useLogin from 'hooks/useLogin';

const Login: React.FC<{}> = () => {
  const loginMutation = useLogin();

  const handleLogin = async (values) => {
    loginMutation.mutate(values);
  };

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
      >
        {() => (
          <Form>
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
            <Button type='submit' colorScheme='teal'>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;

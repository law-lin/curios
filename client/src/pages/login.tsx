import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useAuthenticateMutation } from 'generated/graphql';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';

const Login: React.FC<{}> = () => {
  const [authenticate] = useAuthenticateMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            const login = await authenticate({
              variables: {
                email: values.email,
                password: values.password,
              },
            });
            if (
              login &&
              login.data &&
              login.data.authenticate &&
              login.data.authenticate.jwtToken
            ) {
              localStorage.setItem('token', login.data.authenticate.jwtToken);
            }
            console.log(`jwt_token: ${localStorage.getItem('token')}`);
          } catch (error) {
            console.log(error);
          }
        }}
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

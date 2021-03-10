import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';

const Register: React.FC<{}> = ({}) => {
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={() => {
          console.log('yay');
        }}
      >
        {() => (
          <Form>
            <InputField
              name='username'
              placeholder='Username'
              label='Username'
            />
            <Box mt={4}>
              <InputField
                name='email'
                placeholder='Email'
                label='Email'
                type='email'
              />
            </Box>
            <Box mt={4}>
              <InputField
                name='password'
                placeholder='Password'
                label='Password'
                type='password'
              />
            </Box>
            <Button mt={4} type='submit' colorScheme='teal'>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;

import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useHistory } from 'react-router-dom';
import useCreateUser from 'hooks/useCreateUser';

const Register: React.FC<{}> = () => {
  const history = useHistory();

  const createUserMutation = useCreateUser();

  const handleRegister = async (values) => {
    // await register(email, password, name);
    createUserMutation.mutate(values);
  };

  const renderError = () => {
    if (createUserMutation.isError) {
      return (createUserMutation.error as Error).message;
    }
    return null;
  };

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        onSubmit={handleRegister}
      >
        {() => (
          <Form>
            <InputField
              name='name'
              placeholder='Name'
              label='Name'
              type='name'
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
            {renderError()}
            <p>ok</p>
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

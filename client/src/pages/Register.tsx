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

  function validateName(value) {
    let error;
    if (!value) {
      error = 'Name is required';
    }
    return error;
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 6) {
      error = 'Password must be at least 6 characters';
    }
    return error;
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
              validate={validateName}
            />
            <Box mt={4}>
              <InputField
                name='email'
                placeholder='Email'
                label='Email'
                type='email'
                validate={validateEmail}
              />
            </Box>
            <Box mt={4}>
              <InputField
                name='password'
                placeholder='Password'
                label='Password'
                type='password'
                validate={validatePassword}
              />
            </Box>
            {renderError()}
            <br />
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

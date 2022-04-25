import React, { useState } from 'react';
import {
  Heading,
  Box,
  Center,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { useHistory } from 'react-router-dom';
import useCreateUser from 'hooks/useCreateUser';

const Register: React.FC<{}> = () => {
  const history = useHistory();

  const createUserMutation = useCreateUser();

  const handleRegister = async (values) => {
    createUserMutation.mutate(values, {
      onSuccess: (data, variables, context) => {
        history.push('/verify-email');
      },
    });
  };

  const renderError = () => {
    if (createUserMutation.isError) {
      return (createUserMutation.error as Error).message;
    }
    return null;
  };

  const validateName = (value) => {
    let error;
    if (!value) {
      error = 'Name is required';
    }
    return error;
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

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
            Register
          </Heading>
          <Formik
            initialValues={{ email: '', password: '', name: '' }}
            onSubmit={handleRegister}
          >
            {() => (
              <Form>
                <Stack spacing={5} my={10} px={10}>
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
                      backgroundColor: 'teal.500',
                    }}
                  >
                    Register
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

export default Register;

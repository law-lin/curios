import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useHistory } from 'react-router-dom';
import { register } from 'lib/supabase/store';

const Register: React.FC<{}> = () => {
  const history = useHistory();

  const handleRegister = async ({ email, password, name }) => {
    await register(email, password, name);
    history.push('/verify-email');
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
import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRegisterUserMutation } from '../generated/graphql';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useHistory } from 'react-router-dom';

const Register: React.FC<{}> = () => {
  const [registerUser] = useRegisterUserMutation();
  const history = useHistory();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ name: '', username: '', password: '', email: '' }}
        onSubmit={async (values) => {
          try {
            const newUser = await registerUser({
              variables: {
                name: values.name,
                username: values.username,
                password: values.password,
                email: values.email,
              },
            });
            console.log(
              `${newUser.data?.registerUser?.user?.username} registered.`
            );
            history.push('/app');
          } catch (error) {
            console.log(error);
          }
        }}
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
                name='username'
                placeholder='Username'
                label='Username'
                type='username'
              />
            </Box>
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

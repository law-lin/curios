import { useForm } from 'react-hook-form';
import React from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';

interface Props {
  onSubmit: () => void;
}
const JoinClassForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleFormSubmit = async (values) => {
    const { className, classNumber, classTerm } = values;
  };

  /*join code
    direct link
    or instructor manually adds you */

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='className'>Join Code</FormLabel>
        <Input
          id='joinCode'
          {...register('className', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Join!
      </Button>
    </form>
  );
};

export default JoinClassForm;

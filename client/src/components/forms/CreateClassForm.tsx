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
import { createClass } from 'lib/supabase/store';

interface Props {
  onSubmit: () => void;
}
const CreateClassForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleFormSubmit = async (values) => {
    const { className, classNumber, classTerm } = values;
    console.log(values);
    await createClass(className, classNumber, classTerm);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='className'>Class Name</FormLabel>
        <Input
          id='className'
          placeholder='e.g. Computer Science Principles'
          {...register('className', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='classNumber'>Class Number</FormLabel>
        <Input
          id='classNumber'
          placeholder='e.g. CSE 101'
          {...register('classNumber', {
            required: 'This is required',
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='classTerm'>Class Term</FormLabel>
        <Select
          id='classTerm'
          placeholder='Select term'
          {...register('classTerm', {
            required: 'This is required',
          })}
        >
          <option>Fall 2021</option>
          <option>Spring 2022</option>
          <option>Fall 2022</option>
          <option>Spring 2023</option>
        </Select>

        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Create Class
      </Button>
    </form>
  );
};

export default CreateClassForm;

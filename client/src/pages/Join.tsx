import React, { useState } from 'react';
import {
  Heading,
  Box,
  Center,
  Stack,
  Button,
  useColorModeValue,
  Input,
  FormLabel,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useJoinClass from 'hooks/useJoinClass';

interface Params {
  classId: string;
}
function Join() {
  const { classId } = useParams<Params>();
  const [email, setEmail] = useState('');

  const joinClassMutation = useJoinClass(classId);

  const handleJoin = () => {
    joinClassMutation.mutate();
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
          <Stack spacing={3} align='center' mb={5}>
            <Heading fontSize='2xl' fontWeight='normal' textAlign='center'>
              You have been invited to join
            </Heading>
            <Heading fontSize='3xl' fontWeight='bold' textAlign='center'>
              Class {classId}
            </Heading>
          </Stack>
          <Stack spacing={0} my={20} px={10}>
            <FormLabel htmlFor='passcode'>Enter Passcode</FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id='passcode'
              placeholder='passcode'
            />
          </Stack>
          <Center>
            <Button
              onClick={handleJoin}
              w='30%'
              colorScheme='teal'
              rounded='md'
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
                backgroundColor: 'teal.500',
              }}
            >
              Join
            </Button>
          </Center>
        </Box>
      </Box>
    </Center>
  );
}

export default Join;

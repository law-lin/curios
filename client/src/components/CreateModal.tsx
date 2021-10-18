import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import {
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Divider,
  Center,
  Button,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';
import { SiGoogleclassroom } from 'react-icons/si';
import { BiGroup } from 'react-icons/bi';
import ViewSlider from 'react-view-slider';
import { useForm } from 'react-hook-form';
import CreateClassForm from './forms/CreateClassForm';
import JoinClassForm from './forms/JoinClassForm';

const CreateModal = ({ onClose, isOpen }) => {
  const [index, setIndex] = useState(1);

  const handleClose = () => {
    setIndex(1);
    onClose();
  };

  const goCreate = () => setIndex(0);
  const goBack = () => setIndex(1);
  const goJoin = () => setIndex(2);

  const renderView = ({ index, active, transitionState }) => {
    console.log(index);
    switch (index) {
      case 0:
        return <CreateJoinView header ='Create a Class' form = {<CreateClassForm onSubmit={handleClose} />}/>;
      case 1:
        return <ChoiceView />;
      case 2:
        return <CreateJoinView header ='Join a Class' form = {<JoinClassForm onSubmit={handleClose} />}/>;
    }
  };

  const ChoiceView = () => (
    <>
      <ModalHeader>Create or Join</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box d='flex' justifyContent='space-around' flexDir='row'>
          <Box>
            <Center h='100%'>
              <Container textAlign='center'>
                <Heading textAlign='center'>Create</Heading>
                <Box d='flex' m={5} justifyContent='center'>
                  <SiGoogleclassroom size={50} />
                </Box>
                <Text mb={5}>
                  Classes are a space for students, TAs, and professors to
                  communicate.
                </Text>
                <Button onClick={() => goCreate()}>Create Class</Button>
              </Container>
            </Center>
          </Box>
          <Center height='50vh'>
            <Divider orientation='vertical' />
          </Center>
          <Box>
            <Center h='100%'>
              <Container textAlign='center'>
                <Heading textAlign='center'>Join</Heading>
                <Box d='flex' m={5} justifyContent='center'>
                  <BiGroup size={50} />
                </Box>
                <Text mb={5}>
                  Join your classmates in an existing class for discussions,
                  questions, and more.
                </Text>
                <Button onClick={() => goJoin()}>Join Class</Button>
              </Container>
            </Center>
          </Box>
        </Box>
      </ModalBody>
    </>
  );

  const CreateJoinView = ({header, form}) => (
    <>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>
        <Box>
          <Center h="100%">
            <Container textAlign="center">
              <Box d='flex' m={5} justifyContent='center'>
                <BiGroup size={50} />
              </Box>
              {form}
              <Button margin={2.5} onClick={() => goBack()}>
                Go Back
              </Button>
            </Container>
          </Center>
        </Box>
      </ModalBody>
    </>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size='xl' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ViewSlider
            renderView={renderView}
            numViews={2}
            activeView={index}
            keepViewsMounted={false}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateModal;

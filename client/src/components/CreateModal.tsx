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

const CreateModal = ({ onClose, isOpen }) => {
  const [index, setIndex] = useState(0);

  const handleClose = () => {
    setIndex(0);
    onClose();
  };
  const renderView = ({ index, active, transitionState }) => {
    console.log(index);
    switch (index) {
      case 0:
        return <FirstView />;
      case 1:
        return <SecondView />;
      case 2:
        return <div>Create Group</div>;
    }
  };

  const FirstView = () => (
    <>
      <ModalHeader>Create new</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box d='flex' justifyContent='space-around' flexDir='row'>
          <Box>
            <Center h='100%'>
              <Container textAlign='center'>
                <Heading textAlign='center'>Class</Heading>
                <Box d='flex' m={5} justifyContent='center'>
                  <SiGoogleclassroom size={50} />
                </Box>
                <Text mb={5}>
                  Classes are a space for students, TAs, and professors to
                  communicate.
                </Text>
                <Button onClick={() => setIndex(1)}>Create Class</Button>
              </Container>
            </Center>
          </Box>
          <Center height='50vh'>
            <Divider orientation='vertical' />
          </Center>
          <Box>
            <Center h='100%'>
              <Container textAlign='center'>
                <Heading textAlign='center'>Group</Heading>
                <Box d='flex' m={5} justifyContent='center'>
                  <BiGroup size={50} />
                </Box>
                <Text mb={5}>
                  Groups let you and your peers work together by yourselves.
                </Text>
                <Button onClick={() => setIndex(2)}>Create Group</Button>
              </Container>
            </Center>
          </Box>
        </Box>
      </ModalBody>
    </>
  );

  const SecondView = () => (
    <>
      <ModalHeader>Create new class</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {/* <Box d='flex' justifyContent='space-around' flexDir='row'> */}
        <Box>
          <Center h='100%'>
            <Container textAlign='center'>
              <Box d='flex' m={5} justifyContent='center'>
                <SiGoogleclassroom size={50} />
              </Box>
              <CreateClassForm onSubmit={handleClose} />
            </Container>
          </Center>
        </Box>
        {/* </Box> */}
      </ModalBody>
    </>
  );
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size='xl' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ViewSlider renderView={renderView} numViews={2} activeView={index} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateModal;

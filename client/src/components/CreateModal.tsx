import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import CreateClass from 'pages/CreateClass';
import CreateGroup from 'pages/CreateGroup';
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
  Input,
} from '@chakra-ui/react';
import { SiGoogleclassroom } from 'react-icons/si';
import { BiGroup } from 'react-icons/bi';
import ViewSlider from 'react-view-slider';
import { InputField } from './InputField';
import { createClass } from 'lib/supabase/store';

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
        return <CreateView />;
      case 1:
        return <ChoiceView />;
      case 2:
        return <div>Create Group</div>;
    }
  };

  const ChoiceView = () => (
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
                <Heading textAlign='center'>Group</Heading>
                <Box d='flex' m={5} justifyContent='center'>
                  <BiGroup size={50} />
                </Box>
                <Text mb={5}>
                  Groups let you and your peers work together by yourselves.
                </Text>
                <Button onClick={() => goJoin()}>Create Group</Button>
              </Container>
            </Center>
          </Box>
        </Box>
      </ModalBody>
    </>
  );

  const CreateView = () => (
    <>
      <ModalHeader>Create new class</ModalHeader>
      <ModalBody>
        <Box d='flex' justifyContent='space-around' flexDir='row'>
          <Box>
            <Center h='100%'>
              <Container textAlign='center'>
                <Box d='flex' m={5} justifyContent='center'>
                  <SiGoogleclassroom size={50} />
                </Box>
                <Input
                  name='className'
                  placeholder='e.g. Computer Science Principles'
                  label='Class Name'
                />
                <Input
                  name='classNumber'
                  placeholder='e.g. CSE 101'
                  label='Class Name'
                />
                <Box d='flex' p={5} justifyContent='space-evenly'>
                  <Button
                    onClick={() =>
                      createClass('Computer Science Principles', 'CSE 101')
                    }
                  >
                    Create Class
                  </Button>
                  <Button onClick={() =>
                    goBack()
                  }
                  >
                    Go Back
                  </Button>
                </Box>
              </Container>
            </Center>
          </Box>
        </Box>
      </ModalBody>
    </>
  );
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size='xl' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ViewSlider renderView={renderView} numViews={2} activeView={index} keepViewsMounted={false}/>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateModal;

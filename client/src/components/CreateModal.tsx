import React from 'react';
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
} from '@chakra-ui/react';
import { SiGoogleclassroom } from 'react-icons/si';
import { BiGroup } from 'react-icons/bi';
const CreateModal = ({ onClose, isOpen }) => {
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
      <ModalOverlay />
      <ModalContent>
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
                  <Text mb={5}>Classes are a space for students, TAs, 
                    and professors to communicate.</Text>
                  {/*HEY THIS IS IMPORTANT*/}
                  <CreateClass onCloseM = {onClose} />
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
                  <Text mb={5}>Groups let you and your peers work together by yourselves.</Text>
                  {/*HEY THIS IS ALSO IMPORTANT*/}
                  <CreateGroup onCloseM = {onClose}/>
                </Container>
              </Center>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
};

export default CreateModal;

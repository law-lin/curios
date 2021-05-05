import React from 'react';
import styled from 'styled-components';
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
} from '@chakra-ui/react';
import { SiGoogleclassroom } from 'react-icons/si';
import { BiGroup } from 'react-icons/bi';
const CreateModal = ({ onClose, isOpen }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
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
                  <Box d='flex' justifyContent='center'>
                    <SiGoogleclassroom size={50} />
                  </Box>
                  <Button>Create a new class</Button>
                </Container>
              </Center>
            </Box>
            <Center height='50vh'>
              <Divider orientation='vertical' />
            </Center>
            <Box>
              <Center h='100%'>
                <Container>
                  <Heading textAlign='center'>Group</Heading>
                  <Box d='flex' justifyContent='center'>
                    <BiGroup size={50} />
                  </Box>

                  <Button>Create a new group</Button>
                </Container>
              </Center>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;

import React from 'react';
import styled from 'styled-components';
import {
  useColorMode,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Divider,
  Center,
} from '@chakra-ui/react';
import CreateModal from './CreateModal';

interface ButtonProps {
  colorMode: string;
  collapsed: boolean;
}
const Button = styled.button<ButtonProps>`
  display: inline-block;
  padding: ${(props) => (props.collapsed ? '0.25rem' : '0.5rem 0')};
  cursor: pointer;
  border-radius: ${(props) => (props.collapsed ? '9999px' : '100px')};
  width: ${(props) => (props.collapsed ? '2rem' : '11rem')};
  color: ${(props) => (props.colorMode === 'dark' ? '#FFFFFF' : '#4F4F4F')};
  border: 2px solid
    ${(props) => (props.colorMode === 'dark' ? '#2C2E30' : '#E0E0E0')};
  background: ${(props) =>
    props.colorMode === 'dark' ? '#1E1F21' : '#FAFBFC'};
  &:focus {
    outline: none;
  }
`;

interface Props {
  collapsed: boolean;
}
const CreateButton = ({ collapsed }: Props) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorMode={colorMode} collapsed={collapsed} onClick={onOpen}>
        {!collapsed ? 'Create a class or group' : '+'}
      </Button>
      <CreateModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default CreateButton;

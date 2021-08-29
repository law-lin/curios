import {
  Text,
  Button, 
  Modal, 
  ModalOverlay, 
  ModalHeader, 
  ModalContent, 
  ModalBody, 
  ModalCloseButton, 
  ModalFooter, 
  useDisclosure
} from '@chakra-ui/react';

function CreateGroup(props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Create Group</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Creating a Group</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Text>Lorem Ipsum</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const isOpenG = () => {}
export default CreateGroup;
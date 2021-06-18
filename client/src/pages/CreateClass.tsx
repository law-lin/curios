import React from 'react';
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

function CreateClass(props) {
  const {isOpen, onOpen:onOpenC, onClose} = useDisclosure();

  function openNewModal() {
    //Cannot close original modal and open new modal at same will fix later
    //props.onCloseM();
    onOpenC();
  }
  return (
    <>
      <Button onClick={openNewModal}>Create Class</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Creating a Class</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Text>The powerful, stylish 2021 Camry Hybrid gives up nothing with its optimized fuel economy, 
              79 advanced tech and stirring drive. We have expanded our hybrid battery warranty to reflect 
              our confidence in the quality, dependability and reliability of our products. From the 2020 
              model year forward, every Toyota hybrid battery warranty will cover 10 years from date of 
              first use or 150,000 miles, whichever comes first (previously 8 years or 100,000 miles).</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateClass;
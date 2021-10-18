import React from 'react';
import { 
  Box,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  useClipboard,
  Button,
  Flex,
 } from '@chakra-ui/react';

const LinkInvite = () => {
  const [value, setValue] = React.useState("https://www.youtube.com/watch?v=fC7oUOUEEi4")
  const { hasCopied, onCopy } = useClipboard(value)
  
  return (
    <Box mt='5'>
      <Flex mt = '20' mb='2'>
        <Input value={value} isReadOnly placeholder="Link" />
        <Button onClick={onCopy} ml={2}>
            {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Flex>
      <Text fontSize='sm' color='grey'> Send this link to classmates to invite them.</Text>
    </Box>
  )
}

const EmailInvite = () => {
  return (
    <Box marginTop = '5'>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </Box>
  )
}

const Invite = ({classItem}) => {
  return (
    <Box p="50px">
      <Box mb="15px">
        <Heading size="md">
          Invite your classmates!
        </Heading>
        <Box>
          <Heading size='xs' color='gray' marginTop='1'>
            {classItem.classNumber} &bull; {classItem.classTerm}
          </Heading>
        </Box>
      </Box>
      <Tabs isFitted variant="enclosed" marginTop='5'>
        <TabList>
          <Tab>
            Invite by Email
          </Tab>
          <Tab>
            Invite by Link
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <EmailInvite />
          </TabPanel>
          <TabPanel>
            <LinkInvite />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Invite;
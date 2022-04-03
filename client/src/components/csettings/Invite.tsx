import React, { useState } from 'react';
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
  Textarea,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

const LinkInvite = ({ classItem }) => {
  const [value, setValue] = useState(
    `http://localhost:3000/join/${classItem.id}`
  );
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <Box mt='5'>
      <Flex mt='20' mb='2'>
        <Input value={value} isReadOnly placeholder='Link' />
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </Flex>
      <Text fontSize='sm' color='grey'>
        {' '}
        Send this link to classmates to invite them.
      </Text>
    </Box>
  );
};

function EmailInvite() {
  const [emails, setEmails] = React.useState<string[]>([])

  function validateName(value) {
    let error
    if (!value) {
      error = "Name is required"
    } else {
      const emails = value.toLowerCase().split(",")
      for(let email of emails){
        if(email.trim().indexOf("@") == -1 || email.trim().indexOf(" ") > -1) {
          error = "Invalid Email!"
          break
        }
      }
    }
    return error
  }

  return (
    <Box>
    <Formik
      initialValues={{ name: "kevin@gmail.com" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setEmails(emails.concat(values['name'].toLowerCase().replaceAll(" ", "").split(",")))
          // TODO specify port 9999?
          let url = "https://curiossbu.netlify.app/.netlify/functions/send-invite"
          var xhr = new XMLHttpRequest()
          xhr.open("POST", url, true)
          xhr.setRequestHeader("Accept", "application/json")
          xhr.setRequestHeader("Content-Type", "application/json")
          xhr.send(JSON.stringify(values, null, 2))

          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Field name="name" validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">Emails</FormLabel>
                <Input {...field} id="name" placeholder="zavala@gmail.com, ikora@gmail.com..." />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            ml={1}
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
    <Box marginTop = '3.5'>
      <Textarea 
        isDisabled 
        value = {emails}
        placeholder="Your invited emails will appear here" 
      />
    </Box>
    </Box>
  )
}

const Invite = ({ classItem }) => {
  return (
    <Box p='50px'>
      <Box mb='15px'>
        <Heading size='md'>Invite your classmates!</Heading>
        <Box>
          <Heading size='xs' color='gray' marginTop='1'>
            {classItem.classNumber} &bull; {classItem.classTerm}
          </Heading>
        </Box>
      </Box>
      <Tabs isFitted variant='enclosed' marginTop='5'>
        <TabList>
          <Tab>Invite by Email</Tab>
          <Tab>Invite by Link</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <EmailInvite />
          </TabPanel>
          <TabPanel>
            <LinkInvite classItem={classItem} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Invite;

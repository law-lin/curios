import { Box, Heading } from '@chakra-ui/layout';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';
import PreferenceSwitch from 'components/PreferenceSwitch';
import { Class } from 'types';

interface Props {
  classItem: Class;
}

const classFeatures = [
  {
    name: 'Prevent students from deleting posts',
    description:
      'If enabled, allows students to delete their OWN posts if less than 3 minutes has passed since post creation.',
  },
  {
    name: 'Anonymity Level',
    description:
      'Select whether students can be anonymous to others and who they are anonymous to.',
  },
];

const inviteFeatures = [
  {
    name: 'Student Invites',
    description:
      'If enabled, allows students to invite other students to the class.',
  },
];

const FeaturePreferences = ({ classItem }: Props) => {
  return (
    <Box padding='50px'>
      <Box marginBottom='30px'>
        <Heading size='md' marginBottom='15px'>
          Feature Preferences
        </Heading>
        <Tabs>
          <TabList>
            <Tab>Class Feed</Tab>
            <Tab>Invite</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {classFeatures.map((feature) => {
                return (
                  <PreferenceSwitch
                    name={feature.name}
                    description={feature.description}
                  />
                );
              })}
            </TabPanel>
            <TabPanel>
              {inviteFeatures.map((feature) => {
                return (
                  <PreferenceSwitch
                    name={feature.name}
                    description={feature.description}
                  />
                );
              })}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default FeaturePreferences;

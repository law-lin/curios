import { Box, Switch, useColorModeValue } from '@chakra-ui/react';

interface Props {
  name: String;
  description: String;
  level?: Number;
}

const PreferenceSwitch = ({ name, description, level }: Props) => {
  const hoverbg = useColorModeValue('#f1f2f3', 'gray.700');
  return (
    <Box d='flex' alignItems='center'>
      {level ? <Box marginLeft='5px'>L</Box> : <></>}
      <Box
        flex='1'
        p={['17px', '20px']}
        borderRadius='6px'
        _hover={{ backgroundColor: hoverbg }}
        d='flex'
        justifyContent='space-between'
        alignItems='center'
        marginBottom='10px'
      >
        <Box>
          <Box
            fontSize='14px'
            lineHeight='19px'
            marginBottom='3px'
            fontWeight='600'
          >
            {name}
          </Box>
          <Box fontSize='12px' lineHeight='17px' color='rgba(120,127,133,1)'>
            {description}
          </Box>
        </Box>
        <Switch size='lg' />
      </Box>
    </Box>
  );
};

export default PreferenceSwitch;

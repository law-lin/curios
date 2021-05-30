import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './utils/ApolloClient';

import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: 'dark',
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

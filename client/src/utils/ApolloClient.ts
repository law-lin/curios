import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const cache = new InMemoryCache();

const graphqlUri = 'http://localhost:8080/graphql';

const httpLink = createHttpLink({
  uri: graphqlUri,
});

const authLink = setContext((_: any, { headers }: any) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }
});

const link = ApolloLink.from([authLink, httpLink]);
const client = new ApolloClient({
  cache,
  link,
});

export default client;

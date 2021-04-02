import gql from 'graphql-tag';

export default gql`
  mutation registerUser(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      input: {
        name: $name
        username: $username
        email: $email
        password: $password
      }
    ) {
      clientMutationId
      user {
        username
        createdAt
        updatedAt
      }
    }
  }
`;

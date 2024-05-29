import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://bentomart-real.shelamdp.xyz/',
  cache: new InMemoryCache(),
});

export default client
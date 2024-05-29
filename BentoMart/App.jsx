import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from './src/config/apollo';
import MainTab from './src/navigators/MainTab';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </ApolloProvider>
  );
}


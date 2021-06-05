import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import React, { createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';

import './App.css';
import { Layout } from './components/Layout/Layout';
import { User } from './graphql/graphql';
import { useAuth } from './lib/hooks/useAuth';
import { Home } from './pages/home/Home';
import { Share } from './pages/share/Share';

export interface AuthContextType {
  user?: User;
  saveUser: (user: User, token: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextType>(
  null as unknown as AuthContextType
);

const link = from([
  new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');
    operation.setContext(
      ({ headers }: { headers: { [key: string]: string } }) => ({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
          ...headers
        }
      })
    );
    return forward(operation);
  }),
  new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_END_POINT })
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  },
  link
});

function App() {
  const { user, saveUser, logout } = useAuth();

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ user, saveUser, logout }}>
        <ReactNotification isMobile={true} />
        <Router>
          <Layout>
            <Switch>
              <Route path="/share">
                <Share />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { HttpLink } from "@apollo/client";
import App from './App'
import './styles/main.css'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000',
    headers: {
      'x-user-role': 'admin', // Mocking admin role for POC
    }
  }),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)

import React from 'react';
import './App.css';
import ProductListing from './ProductListing';
import Container from '@material-ui/core/Container'

function App() {
  return (
  <div className="App">
    <Container maxWidth="md">
      <ProductListing url="https://74k4rzrsqubz5ma3f-mock.stoplight-proxy.io/api/v1/images/list"/>
    </Container>    
  </div>
  );
}

export default App;

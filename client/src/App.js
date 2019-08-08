import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import HomepageLayout from './components/home/HomePageLayout';
import Users from './components/users/Users';
import Products from './components/products/Products';
import LoginLayout from './components/LoginLayout/LoginLayout';

function App() {
  return (
    <div className="App">
      <HomepageLayout/>
      <Users/>
      <Products/>
      <LoginLayout/>
    </div>
  );
}

export default App;

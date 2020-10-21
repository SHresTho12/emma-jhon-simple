import React from 'react';

import './App.css';
import Header from './Components /Header/Header';
import Shop from './Components /Shop/Shop'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components /Review /Review';
import Inventory from './Components /Inventory/Inventory ';
import Notfound from './Components /Notfound/Notfound';
import Productdetail from './Components /Productdetail/Productdetail';
import Login from './Components /Shipment/Login/Login';
import Shipment from './Components /Shipment/Shipment';

import { useState } from 'react';
import { createContext } from 'react';
import PrivateRoute from './Components /PrivateRoute/PrivateRoute';

export const UserContext = createContext();
function App() {

  const [loggedInUser,setLoggedInUser] = useState({});
  return (
   
 <UserContext.Provider value= {[loggedInUser,setLoggedInUser]}>
     <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
<Shop></Shop>
          </Route>
          <Route path="/review">
<Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
<Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
<Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
<Login></Login>
          </Route>
          <Route exact path="/">
<Shop></Shop>
          </Route>
          <Route path="/product/:productkey">
            <Productdetail></Productdetail>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
</UserContext.Provider>
  
      
  );
}

export default App;

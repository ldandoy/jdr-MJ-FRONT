import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import NavbarSite from "./components/NavbarSite";
import AccueilScreen from "./screens/AccueilScreen";
import SenariosScreen from "./screens/SenariosScreen";
import StartScreen from "./screens/StartScreen";
import SectionScreen from "./screens/SectionScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import AccountScreen from "./screens/AccountScreen";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter forceRefresh={true}>
      <NavbarSite />
      <Route path="/" exact component={AccueilScreen} />
      <Route path="/senarios" component={SenariosScreen} />
      <Route path="/:senarioId/start" component={StartScreen} />
      <Route path="/:senarioId/section/:sectionId" render={props => <SectionScreen {...props} />} />
      <Route path='/account' component={AccountScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/login" component={LoginScreen} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

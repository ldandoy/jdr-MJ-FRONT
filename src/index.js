import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import NavbarSite from "./components/NavbarSite";
import AccueilScreen from "./screens/AccueilScreen";
import SenariosScreen from "./screens/SenariosScreen";
import StartScreen from "./screens/StartScreen";
import SectionScreen from "./screens/SectionScreen";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarSite />
      <Route path="/" exact={true} component={AccueilScreen} />
      <Route path="/senarios" component={SenariosScreen} />
      <Route path="/:senarioId/start" component={StartScreen} />
      <Route path="/:senarioId/section/:sectionId" component={SectionScreen} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { DataProvider } from './store/GlobalState'

import NavbarSite from "./components/NavbarSite";
import AccueilScreen from "./screens/AccueilScreen";
import SenariosScreen from "./screens/SenariosScreen";
import StartScreen from "./screens/StartScreen";
import EditerScreen from "./screens/EditerScreen";
import SectionScreen from "./screens/SectionScreen";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <BrowserRouter>
        <NavbarSite />
        <Route path="/" exact={true} component={AccueilScreen} />
        <Route path="/senarios" component={SenariosScreen} />
        <Route path="/:senarioId/start" component={StartScreen} />
        <Route path="/:senarioId/edit" component={EditerScreen} />
        <Route path="/:senarioId/section/:sectionId" render={props => <SectionScreen key={Date.now()} {...props} />} />
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

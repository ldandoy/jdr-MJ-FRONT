import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import AccueilScreen from "./AccueilScreen"

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="App">
      <BrowserRouter>
      <Navigation />
        <Route path="/" exact={true} component={AccueilScreen} />
    </BrowserRouter>
    </div>
  }
}

export default App;

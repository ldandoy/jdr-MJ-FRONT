import React from 'react'

class AccueilScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {senarios: []};
  }

  componentDidMount() {}

  render() {
    return <div className="AccueilScreen">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="mt-4 mb-4">Bienvenue sur le Maite du Jeu virtuel.</h1>
          </div>
        </div>
      </div>
    </div>
  }
}

export default AccueilScreen;

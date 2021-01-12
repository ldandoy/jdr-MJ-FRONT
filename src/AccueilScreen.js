import React from 'react'
import { Link } from 'react-router-dom';

class AccueilScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {senarios: []};
  }

  componentDidMount() {
    fetch('https://mjvirtuelapi.herokuapp.com/api/senarios')
    .then(response => response.json())
    .then((senarios) => {
      console.log(senarios);
      this.setState({
        'senarios': senarios
      });
    })
    .catch((error) => {
      console.error(error)
    })
  }

  render() {
    const items = this.state.senarios.map((senario) =>
        <li key={senario.id}>
          {senario.title}
          <Link className="btn btn-success btn-sm" to="/sections/">+</Link>
        </li>
    );

    return <div className="AccueilScreen">
      <h1>Bienvenue sur le Maite du Jeu virtuel.</h1>
      <h2>Choisis le sénario que tu veux faire avec tes amis:</h2>
      <ul>
        {items}
      </ul>
    </div>
  }
}

export default AccueilScreen;

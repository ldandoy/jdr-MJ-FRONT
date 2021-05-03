import React from 'react'
import { Link } from 'react-router-dom';
import { CardColumns, Card } from 'react-bootstrap';

class SenariosScreen extends React.Component {
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
    });
  }

  render() {
    const picture = (senario) => {
      if (senario.picture !== null) { 
        return <Card.Img variant="top" src={senario.picture} />
      }else {
        return <></>
      }
    }
    const items = this.state.senarios.map((senario) =>
      <Card key={senario._id}>
        {picture(senario)}
        <Card.Body>
          <Card.Title>{senario.title}</Card.Title>
          <Card.Text>
            {senario.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link className="btn btn-success btn-sm" to={"/" + senario._id + "/start"}>Faire ce sénario</Link>
          &nbsp;
          <Link className="btn btn-info btn-sm" to={"/" + senario._id + "/edit"}>Editer ce sénario</Link>
        </Card.Footer>
      </Card>
    );

    return <div className="container">
      <div className="row">
        <div className="AccueilScreen col-12">
          <h1 className="mt-4 mb-4">Choisis le sénario que tu veux faire avec tes amis:</h1>
          <CardColumns>
            {items}
          </CardColumns>
        </div>
      </div>
    </div>
  }
}

export default SenariosScreen;

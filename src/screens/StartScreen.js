import React from 'react'
import { Link } from 'react-router-dom';

class  StartScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            senarioId: props.match.params.senarioId,
            senario: {}
        }
    }

    componentDidMount() {
        fetch('https://mjvirtuelapi.herokuapp.com/api/senarios/'+this.state.senarioId)
        .then(response => response.json())
        .then((senario) => {
            console.log(senario);
            this.setState({ 'senario': senario });
        })
        .catch((error) => {
            console.error(error)
        });
    }

    render() {
        return <div className="StartScreen" style={{
            backgroundImage: "url("+this.state.senario.picture+")",
            backgroundSize: "cover"
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="screen">
                            <h1 className="text-center">Bienvenu sur le sénario</h1>
                            <h2 className="text-center">{ this.state.senario.title }</h2>
                            <p className="text-center">{ this.state.senario.description }</p>
                            <p className="text-center"><Link to={"/" + this.state.senarioId + "/section/0"} className="btn btn-sm btn-success">Lancer le sénario</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default StartScreen;
import React from 'react'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

class  EditerScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            senarioId: props.match.params.senarioId,
            senario: {
                sections: []
            },
            newSection: {
                title: "",
                description: "",
                picture: "",
                gotos: [],
                newGoto: {
                    label: "",
                    url: ""
                }
            },
            newGoto: {
                label: "",
                url: ""
            }
        }
    }

    componentDidMount() {
        fetch('https://mjvirtuelapi.herokuapp.com/api/senarios/'+this.state.senarioId)
        .then(response => response.json())
        .then((senario) => {
            senario.sections.forEach(section => {
                section.newGoto = {
                    label: "",
                    url: ""
                }
            });
            this.setState({ 'senario': senario });
        })
        .catch((error) => {
            console.error(error)
        });
    }

    render() {
        const card =  this.state.senario.sections.map((section, index) => 
            <Card key={index}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={section}>
                        {index}: {section.title}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={section}>
                    <Card.Body>
                        <div className="text-right">
                            <Button variant="danger" onClick={(e) => {
                                const senario = this.state.senario;
                                senario.sections.splice(index, 1)
                                this.setState({senario});
                            }}>X</Button>
                        </div>
                        <hr />
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Titre de la section</Form.Label>
                            <Form.Control type="text" onChange={(e) => {
                                const senario = this.state.senario;
                                senario.sections[index].title = e.target.value;
                                this.setState({senario});
                            }} value={this.state.senario.sections[index].title} placeholder="Entrez le titre de la section" />
                        </Form.Group>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Description de la section</Form.Label>
                            <Form.Control type="text" onChange={(e) => {
                                const senario = this.state.senario;
                                senario.sections[index].description = e.target.value;
                                this.setState({senario});
                            }} value={this.state.senario.sections[index].description} placeholder="Entrez la description de la section" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPicture">
                            <Form.Label>Image de la section</Form.Label>
                            <Form.Control type="text" onChange={(e) => {
                                const senario = this.state.senario;
                                senario.sections[index].picture = e.target.value;
                                this.setState({senario});
                            }} value={this.state.senario.sections[index].picture} placeholder="Entrez l'image de votre sénario" />
                            <br /><Image thumbnail src={this.state.senario.sections[index].picture} alt="Photos du sénario" />
                        </Form.Group>
                        {
                            this.state.senario.sections[index].gotos.map((goto, indexGoto) => <div key={indexGoto}>
                                <h5>{goto.label} <Button variant="danger" onClick={(e) => {
                                    e.preventDefault();
                                    const senario = this.state.senario;
                                    senario.sections[index].gotos.splice(indexGoto, 1)
                                    this.setState({senario});
                                }}>X</Button></h5>
                                <Form.Group controlId="formBasicTitle">
                                    <Form.Label>Label du goto</Form.Label>
                                    <Form.Control type="text" onChange={(e) => {
                                        const senario = this.state.senario;
                                        senario.sections[index].gotos[indexGoto].label = e.target.value;
                                        this.setState({senario});
                                    }} value={this.state.senario.sections[index].gotos[indexGoto].label} placeholder="Entrez le label du goto" />
                                </Form.Group>
                                <Form.Group controlId="formBasicTitle">
                                    <Form.Label>Url du goto</Form.Label>
                                    <Form.Control type="text" onChange={(e) => {
                                        const senario = this.state.senario;
                                        senario.sections[index].gotos[indexGoto].url = e.target.value;
                                        this.setState({senario});
                                    }} value={this.state.senario.sections[index].gotos[indexGoto].url} placeholder="Entrez le url du goto" />
                                </Form.Group>
                            </div>)
                        }

                        <h5>Nouveau goto</h5>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Label du goto</Form.Label>
                            <Form.Control type="text" value={this.state.senario.sections[index].newGoto.label} onChange={(e) => {
                                const senario = this.state.senario;
                                senario.sections[index].newGoto.label = e.target.value;
                                this.setState({senario});
                            }} placeholder="Entrez le label du goto" />
                        </Form.Group>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Url du goto</Form.Label>
                            <Form.Control type="text" value={this.state.senario.sections[index].newGoto.url} onChange={(e) => {
                                const senario = this.state.senario;
                                senario.sections[index].newGoto.url = e.target.value;
                                this.setState({senario});
                            }} placeholder="Entrez le url du goto" />
                        </Form.Group>
                        <div className="text-right">
                            <Button onClick={(e) => {
                                e.preventDefault();
                                const newSection = this.state.newSection;
                                newSection.gotos.push(this.state.newGoto);
                                this.setState({newSection});
                                this.setState({newGoto: {
                                    label: "",
                                    url: ""
                                }});
                            }} variant="primary">Ajouter un goto</Button>
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );

        return <div className="EditerScreen">
            <div className="container-fluid">
                <Form>
                    <div className="row">
                        <div className="col-6">
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>Titre du sénario</Form.Label>
                                <Form.Control type="text" value={this.state.senario.title} onChange={(e) => {
                                    const senario = this.state.senario;
                                    senario.title = e.target.value;
                                    this.setState(senario);
                                }} placeholder="Entrez le titre de votre sénario" />
                            </Form.Group>
                            <Form.Group controlId="formBasicDescription">
                                <Form.Label>Description du sénario</Form.Label>
                                <Form.Control type="text" value={this.state.senario.description} onChange={(e) => {
                                    const senario = this.state.senario;
                                    senario.description = e.target.value;
                                    this.setState(senario);
                                }} placeholder="Entrez la description de votre sénario" />
                            </Form.Group>
                            <Form.Group controlId="formBasicUniverse">
                                <Form.Label>Univers du sénario</Form.Label>
                                <Form.Control type="text" value={this.state.senario.universe} onChange={(e) => {
                                    const senario = this.state.senario;
                                    senario.universe = e.target.value;
                                    this.setState(senario);
                                }} placeholder="Entrez l'univers de votre sénario" />
                            </Form.Group>
                            <Form.Group controlId="formBasicNbBPersonne">
                                <Form.Label>Nombre de personne du sénario</Form.Label>
                                <Form.Control type="number" value={this.state.senario.nbPersonne} onChange={(e) => {
                                    const senario = this.state.senario;
                                    senario.nbPersonne = e.target.value;
                                    this.setState(senario);
                                }} placeholder="Entrez le nombre de personne de votre sénario" />
                            </Form.Group>
                            <Form.Group controlId="formBasicDuration">
                                <Form.Label>Durée du sénario</Form.Label>
                                <Form.Control type="number" value={this.state.senario.duration} onChange={(e) => {
                                    const senario = this.state.senario;
                                    senario.duration = e.target.value;
                                    this.setState(senario);
                                }} placeholder="Entrez la durée de votre sénario" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPicture">
                                <Form.Label>Image du sénario</Form.Label>
                                <Form.Control type="text" value={this.state.senario.picture} onChange={(e) => {
                                    const senario = this.state.senario;
                                    senario.picture = e.target.value;
                                    this.setState(senario);
                                }} placeholder="Entrez l'image de votre sénario" />
                                <br /><Image thumbnail src={this.state.senario.picture} alt="Photos du sénario" />
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Accordion>
                                {card}
                                <Card key={this.state.newSection}>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Nouvelle section
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <Form.Group controlId="formBasicTitle">
                                                <Form.Label>Titre de la section</Form.Label>
                                                <Form.Control type="text" value={this.state.newSection.title} onChange={(e) => {
                                                    const newSection = this.state.newSection;
                                                    newSection.title = e.target.value;
                                                    this.setState({newSection});
                                                }} placeholder="Entrez le titre de la section" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicTitle">
                                                <Form.Label>Description de la section</Form.Label>
                                                <Form.Control type="text" value={this.state.newSection.description} onChange={(e) => {
                                                    const newSection = this.state.newSection;
                                                    newSection.description = e.target.value;
                                                    this.setState({newSection});
                                                }} placeholder="Entrez la description de la section" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPicture">
                                                <Form.Label>Image de la section</Form.Label>
                                                <Form.Control type="text" value={this.state.newSection.picture} onChange={(e) => {
                                                    const newSection = this.state.newSection;
                                                    newSection.picture = e.target.value;
                                                    this.setState({newSection});
                                                }} placeholder="Entrez l'image de votre sénario" />
                                                <br /><Image thumbnail src={this.state.newSection.picture} alt="Photos du sénario" />
                                            </Form.Group>
                                                
                                            {
                                                this.state.newSection.gotos.map((goto, indexGoto) => <>
                                                    <h5>{goto.label}</h5>
                                                    <Form.Group controlId="formBasicTitle">
                                                        <Form.Label>Label du goto</Form.Label>
                                                        <Form.Control type="text" value={this.state.newSection.gotos[indexGoto].label} placeholder="Entrez le label du goto" />
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicTitle">
                                                        <Form.Label>Url du goto</Form.Label>
                                                        <Form.Control type="text" value={this.state.newSection.gotos[indexGoto].url} placeholder="Entrez le url du goto" />
                                                    </Form.Group>
                                                </>)
                                            }

                                            <h5>Nouveau goto</h5>
                                            <Form.Group controlId="formBasicTitle">
                                                <Form.Label>Label du goto</Form.Label>
                                                <Form.Control type="text" value={this.state.newGoto.label} onChange={(e) => {
                                                    const newGoto = this.state.newGoto;
                                                    newGoto.label = e.target.value;
                                                    this.setState({newGoto});
                                                }} placeholder="Entrez le label du goto" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicTitle">
                                                <Form.Label>Url du goto</Form.Label>
                                                <Form.Control type="text" value={this.state.newGoto.url} onChange={(e) => {
                                                    const newGoto = this.state.newGoto;
                                                    newGoto.url = e.target.value;
                                                    this.setState({newGoto});
                                                }} placeholder="Entrez le url du goto" />
                                            </Form.Group>
                                            <div className="text-right">
                                                <Button onClick={(e) => {
                                                    e.preventDefault();
                                                    const newSection = this.state.newSection;
                                                    newSection.gotos.push(this.state.newGoto);
                                                    this.setState({newSection});
                                                    this.setState({newGoto: {
                                                        label: "",
                                                        url: ""
                                                    }});
                                                }} variant="primary">Ajouter un goto</Button>
                                            </div>
                                            <hr />
                                            <div className="">
                                                <Button onClick={(e) => {
                                                    e.preventDefault();
                                                    const senario = this.state.senario;
                                                    senario.sections.push(this.state.newSection);
                                                    this.setState({senario});
                                                    this.setState({newSection: {
                                                        title: "",
                                                        description: "",
                                                        picture: "",
                                                        gotos: [],
                                                        newGoto: {
                                                            label: "",
                                                            url: ""
                                                        }
                                                    }});
                                                }} variant="success">Ajouter une section</Button>
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-4">
                            <div className="text-right">
                                <Button variant="primary" type="submit">Mettre à jour</Button>
                                &nbsp;
                                <Link to={"/senarios"} className="btn btn-secondary">Retour</Link>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    }
}

export default EditerScreen;
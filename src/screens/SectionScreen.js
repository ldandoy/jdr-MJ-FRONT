import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";

const SectionScreen = (props) => {
    const [senarioId, setSenarioId] = useState(props.match.params.senarioId);
    const [sectionId, setSectionId] = useState(props.match.params.sectionId);
    const [senario, setSenario] = useState({});
    const [currentSection, setCurrentSection] = useState({});
    const [textResult, setTextResult] = useState('')
    const [gotoResult, setGotoResult] = useState('')
    const [gotoLabelResult, setGotoLabelResult] = useState('')
    const [gotoTypeResult, setGotoTypeResult] = useState('')
    
    const history = useHistory()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        fetch('https://mjvirtuelapi.herokuapp.com/api/senarios/'+senarioId)
        .then(response => response.json())
        .then((senario) => {
            setSenario(senario);
            setCurrentSection(senario.sections[sectionId])
        })
        .catch((error) => {
            console.error(error)
        });
    },[senarioId, sectionId])

    const handleAction = (action) => {
        let res = Math.floor(Math.random() * 10)

        if (res > action.success) {
            setTextResult(action.textSuccess)
            setGotoResult(action.gotoSuccess)
            setGotoLabelResult(action.gotoLabelSuccess)
            setGotoTypeResult('success')
        } else {
            setTextResult(action.textFailed)
            setGotoResult(action.gotoFailed)
            setGotoLabelResult(action.gotoLabelFailed)
            setGotoTypeResult('danger')
        }

        setShow(true)
    }

    return <div className="container">
        <div className="row">
            <div className="SectionScreen col-12">
                <div className="screen">
                    <h1 className="text-center mt-4">{currentSection.title}</h1>
                    <div className="ligne">
                        <div className="text-center mt-4 mb-4">{ currentSection.picture && <img src={currentSection.picture} alt="this.state.currentSection.title" className="image" /> }</div>
                        <div className="text-center mt-4 mb-4 description">{currentSection.description}</div>
                    </div>
                    <div className="mt-4 goto-list">{ Object.keys(currentSection).length !== 0 && currentSection.actions.map((action, index) => 
                        {
                            if (action.type === "goto" ) {
                                return <div key={index}><Link to={"/" + senarioId + action.url} className="btn btn-info" refresh="true">{action.label}</Link></div>
                            } else {
                                return <div key={index}>
                                    <button className="btn btn-info" onClick={(e) => handleAction(action)}>{action.label}</button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{action.label}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p>{textResult}</p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                                            <Button variant={gotoTypeResult} onClick={(e) => history.push(`/${senarioId}${gotoResult}`)}>{gotoLabelResult}</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            }
                        }
                    )}</div>
                </div>
            </div>
        </div>
    </div>
}


/*class SectionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            senarioId: props.match.params.senarioId,
            sectionId: props.match.params.sectionId,
            senario: {},
            currentSection: {}
        };
    }

    componentDidMount() {
        fetch('https://mjvirtuelapi.herokuapp.com/api/senarios/'+this.state.senarioId)
        .then(response => response.json())
        .then((senario) => {
            this.setState({ 'senario': senario });
            this.setState({ 'currentSection': this.state.senario.sections[this.state.sectionId] });
        })
        .catch((error) => {
            console.error(error)
        });
    }

    render() {
        let actionList ;
        if (Object.keys(this.state.currentSection).length !== 0) {
            actionList = this.state.currentSection.actions.map((action, index) => 
                <div key={index}><Link to={"/" + this.state.senarioId + action.url} className="btn btn-info">{action.label}</Link></div>
            );
        } else {
            actionList = <></>
        }

        let picture = <></>;

        if (this.state.currentSection.picture !== "") {
            picture = <img src={this.state.currentSection.picture} alt="this.state.currentSection.title" className="image" />
        }

        return <div className="container-fluid">
            <div className="row">
                <div className="SectionScreen col-12">
                    <div className="screen">
                        <h1 className="text-center mt-4">{this.state.currentSection.title}</h1>
                        <div className="ligne">
                            <div className="text-center mt-4 mb-4">{ picture }</div>
                            <div className="text-center mt-4 mb-4 description">{this.state.currentSection.description}</div>
                        </div>
                        <div className="mt-4 goto-list">{actionList}</div>
                    </div>
                </div>
            </div>
        </div>
    }
}
*/

export default SectionScreen;

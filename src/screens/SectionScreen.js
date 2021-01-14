import React from 'react'
import { Link } from 'react-router-dom';

class  SectionScreen extends React.Component {
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
            this.setState({ 'currentSection': this.state.senario.section[this.state.sectionId] });
        })
        .catch((error) => {
            console.error(error)
        });
    }

    render() {
        let gotoList ;
        if (Object.keys(this.state.currentSection).length !== 0) {
            gotoList = this.state.currentSection.gotos.map((goto, index) =>
                <div key={index}><Link to={"/" + this.state.senarioId + goto.url} className="btn btn-info">{goto.label}</Link></div>
            );
        } else {
            gotoList = <></>
        }

        let picture = <></>;

        if (this.state.currentSection.picture !== "") {
            picture = <img src={this.state.currentSection.picture} alt="this.state.currentSection.title" className="image" />
        }

        return <div className="container">
            <div className="row">
                <div className="SectionScreen col-12">
                    <div className="screen">
                        <h1 className="text-center mt-4">{this.state.currentSection.title}</h1>
                        <div className="ligne">
                            <div className="text-center mt-4 mb-4">{ picture }</div>
                            <div className="text-center mt-4 mb-4 description">{this.state.currentSection.description}</div>
                        </div>
                        <div className="mt-4 goto-list">{gotoList}</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default SectionScreen;
import React from "react";
import EventGroup from "./EventGroup";
import Navbar from "./NavBar";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            created: [],
            invited: [],
            ready: false
        }
    }
    
    componentDidMount = (e) => {
        // e.preventDefault()
        fetch("/eventsYF", {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            this.setState({ created: json.created })
            this.setState({ invited: json.invited })
            this.setState({ ready: true})
        })
    }

    render() {
        this.componentDidMount()
        if (this.state.ready) {
            return (
                <div className="container">
                    <Navbar />
                    <EventGroup title={"My Events"}  events={this.state.created} />
                    <EventGroup title={"Invitations"} events={this.state.invited} />
                </div>
            );
        }
    }
}

export default Home;
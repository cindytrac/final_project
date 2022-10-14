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

        this.handleLoad = this.handleLoad.bind(this)
        this.handleNewUser = this.handleNewUser.bind(this);
    }

    handleLoad = async () => {
        window.addEventListener('load', this.handleNewUser);
        const res = await fetch("/eventsYF", {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json()
        if (json.created.length > 0) {
            this.setState({ created: json.created })
        }
        if (json.invited.length > 0) {
            this.setState({ invited: json.invited })
        }
        this.setState({ ready: true})
    }


    async handleNewUser() {
        let body = ""
        const res = await fetch( '/newuser', {
          method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body
        })
        const json = await res.json()
          if (json.newUser) {
            alert("Your user account has been created.")
          }
    }
    
    componentDidMount() {
        this.handleLoad()
    }

    render() {
        if (this.state.ready) {
            return (
                <div>
                    {/* <div className="modal fade">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Hello
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
            
                            </div>
                        </div>

                    </div> */}
                    <div className="container">
                        <Navbar />
                        <EventGroup title={"My Events"} message={"You don't have any created events."} events={this.state.created} />
                        <EventGroup title={"Invitations"} message={"You don't have any event invitations."} events={this.state.invited} />
                    </div>
                </div>
            );
        }
    }
}

export default Home;
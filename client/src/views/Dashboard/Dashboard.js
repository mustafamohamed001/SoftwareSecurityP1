import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

class Dashboard extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name, value);
    }

    handleSubmit(e){
        if(this.state.username === "admin" && this.state.password === "password"){
            localStorage.setItem('signedin', true);
            e.preventDefault()
		    this.props.history.push('/listflowers');
        }
    }

    render(){
        return (
            <div style={{minHeight: 750}}>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
    
}

export default Dashboard;

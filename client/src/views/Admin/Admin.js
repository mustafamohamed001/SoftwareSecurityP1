import React, { Component } from 'react';
import './Home.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import axios from 'axios';

class Admin extends Component {
    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            username: '',
            emailaddress: ''
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

    render(){
        return (
            <div style={{minHeight: 725}}>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                    <form autoComplete="off">
                        <br/>
                        <p className="h4 text-center mb-4">Sign Up</p>
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                Username
                            </label>
                        <input
                            type="text"
                            name="username"
                            id="standard-required"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.username}
                        />
                        <br/>
                            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                Email Address
                            </label>
                        <input
                            type="text"
                            id="standard-required"
                            name="emailaddress"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.emailaddress}
                        />
                        <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                Password
                            </label>
                        <input
                            label="Password"
                            type="password"
                            id="standard-required"
                            name="password"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                                                <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                Retype Password
                            </label>
                        <input
                            label="Password"
                            type="password"
                            id="standard-required"
                            name="retypepassword"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.retypepassword}
                        />

                        <div className="text-center mt-4">
                            <button color="indigo" type="submit" onClick={this.handleSubmit}>Register</button>
                        </div>
                    </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            </div>
        );
    }
    
}

export default Admin;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

class Register extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            username: '',
            password: '',
           // retypepassword: ''
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
		    this.props.history.push('/Login');
        }
    }

    render(){
        return (
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
                            name="password"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />






                        <div className="text-center mt-4">
                            <button color="indigo" type="submit" onClick={this.handleSubmit}>Register</button>
                        </div>
                    </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
    
}

export default Register;

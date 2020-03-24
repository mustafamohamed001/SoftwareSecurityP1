import React, { Component } from 'react';
import './Home.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import axios from 'axios';

class Admin extends Component {
    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            result: [],
        }
    }

    handleSubmit = () => {
        axios.post('/api/getusers')
        .then((res, err) => {

        	var tempusers = [];
        	for (var j = 0; j < res.data.length; j++){
            	tempusers.push(res.data[j]);
			}
			this.setState({
                result: tempusers,
            })
			
        })
        .catch((err) => {
        	console.log(err);
        });
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

        const showResults = this.state.result.map((element, index) => {
            return(
                <div>
                    {element.USERNAME}
                </div>
 

             );
        }) 


        return (
            <div style={{minHeight: 725}}>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        {showResults}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            </div>
        );
    }
    
}

export default Admin;

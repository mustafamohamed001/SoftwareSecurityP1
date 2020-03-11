import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
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

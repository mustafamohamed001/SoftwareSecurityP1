import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

class Home extends Component {
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return (
            <div style={{minHeight: 750}}>
                <br/>
                <MDBContainer>
                    <MDBRow>
                        <AwesomeSlider>
                            <div data-src="/images/bank.jpg" />
                            <div data-src="/images/moneybed.jpg" />
                            <div data-src="/images/mrkrabs.jpg" />
                        </AwesomeSlider>
                    </MDBRow>
                </MDBContainer>
            </div>

        );
    }
    
}

export default Home;

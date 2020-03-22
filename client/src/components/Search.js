import React, { Component } from 'react';
import { MDBInput } from 'mdbreact';
import 'react-awesome-slider/dist/styles.css';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from 'axios';

class Search extends Component {
    constructor(){
        super();
        this.state = {
            search: '',
            result: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        axios.post('/api/search', {
            search: this.state.search,
        })
            .then((res, err) => {
                this.setState({
                    result: res.data
                })
            })
            .catch((err) => {
                
            });

        console.log(name, value);
        
    }

    render(){
        console.log(this.state.result);
        
        return (
            <div style={{minHeight: 750}}>
                <Container>
                    <br/>
                        <Card>
                            <Card.Body>
                                <div class="d-flex justify-content-center">
                                    <Card.Title>Search</Card.Title>
                                </div>
                                <Card.Body>
                                    <Row>
                                        <p>Search: <MDBInput label="Search" value={this.state.search} name="search" onChange={this.handleInputChange}/></p>
                                    </Row>
                                    <div class="d-flex justify-content-center">
                                        {/* <p>{this.state.result}</p> */}
                                    </div>
                                </Card.Body>
                            </Card.Body>
                        </Card> 
                    <br/>
                </Container>
            </div>

        );
    }
    
}

export default Search;

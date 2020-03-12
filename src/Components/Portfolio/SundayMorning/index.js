import React, { Component } from 'react';
import FizzBuzz from './fizzbuzz.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Machine } from 'xstate';
import { Subject } from 'rxjs';

const fizzbuzz = new FizzBuzz();
const fizzbuzzSubj = new Subject();

class SundayMorning extends Component {
    constructor() {
        super();

        this.state = {
            fbInput: "15",
            fbDisplay: ""
        }
    }

    componentDidMount() {
        fizzbuzzSubj.subscribe({
            next: () => this.setState({fbDisplay: fizzbuzz.generateFB(parseInt(this.state.fbInput))})
        })
    }

    handleFBInputChange = (e) => {
        this.setState({
            fbInput: e.target.value
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Sunday Morning Programming Projects</h1>
                        <h2>Easy like a smooth cup o' joe on a breezy Sunday morning</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Title>Fizzbuzz</Card.Title>
                            <Card.Subtitle>The classic Fizzbuzz</Card.Subtitle>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Enter Limit (max 9999)</Form.Label>
                                    <Form.Control type="text" placeholder="15" onChange={this.handleFBInputChange}></Form.Control>
                                    <Form.Text>Default 15</Form.Text>
                                    <Button onClick={() => fizzbuzzSubj.next() } variant="primary">Activate the Buzz</Button>
                                    <Form.Control readOnly value={this.state.fbDisplay} as="textarea" rows={3} />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SundayMorning;
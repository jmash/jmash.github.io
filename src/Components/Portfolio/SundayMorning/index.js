import React, { Component } from 'react';
import FizzBuzz from './fizzbuzz.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { interpret } from 'xstate';
import { fizzbuzzMachine } from './fizzbuzzMachine';
import { Subject } from 'rxjs';

const fizzbuzz = new FizzBuzz();
const fizzbuzzSubj = new Subject();


class SundayMorning extends Component {
    constructor() {
        super();

        this.fizzbuzzService = interpret(fizzbuzzMachine).onTransition(current =>
            this.setState({ current })
        );

        this.state = {
            fbInput: "15",
            fbDisplay: "",
            current: fizzbuzzMachine.initialState,
        }
    }

    componentDidMount() {
        this.fizzbuzzService.start();
        fizzbuzzSubj.subscribe({
            next: () => {
                let inputVal;
                this.state.fbInput.length === 0 ? inputVal = "15" : inputVal = this.state.fbInput;
                this.setState({fbDisplay: fizzbuzz.generateFB(parseInt(inputVal))});
            }
        })
    }

    componentWillUnmount() {
        this.fizzbuzzService.stop();
    }

    handleFBInputChange = (e) => {
        this.setState({
            fbInput: e.target.value
        }, () => {
            this.fizzbuzzService.send({ type: 'CHANGE', input: this.state.fbInput });
            console.log(this.fizzbuzzService._state);
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
                                    <Button disabled={this.state.current.matches('execDisallowed')} onClick={() => fizzbuzzSubj.next() } variant="primary">Activate the Buzz</Button>
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
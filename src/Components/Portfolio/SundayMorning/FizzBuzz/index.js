import React, { Component } from 'react';

export default class FizzBuzz extends Component {
    constructor() {
        super();

        this.fizzbuzzService = interpret(fizzbuzzMachine).onTransition(fbCurrent =>
            this.setState({ fbCurrent })
        );

        this.state = {
            fbInput: "15",
        }

        componentDidMount() {
            this.fizzbuzzService.start();

            fizzbuzzSubj.subscribe({
                next: () => {
                    let inputVal;
                    this.state.fbInput.length === 0 ? inputVal = "15" : inputVal = this.state.fbInput;
                    this.setState({fbDisplay: fizzbuzz.generateFB(parseInt(inputVal))});
                }
            });
        }
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
            <Row>
                <Col>
                    <Card>
                        <Card.Title>Fizzbuzz</Card.Title>
                        <Card.Subtitle>The classic Fizzbuzz</Card.Subtitle>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Enter Limit (min 1, max 9999)</Form.Label>
                                <Form.Control type="text" placeholder="15" onChange={this.handleFBInputChange}></Form.Control>
                                { this.state.fbCurrent.matches('execAllowed') && <Form.Text>Default 15</Form.Text> }
                                { this.state.fbCurrent.matches('execDisallowed') && <Form.Text className={cx(sundaymorningStyles['input-error'])}>Input must be a number between 1 and 9999</Form.Text> }
                                <Button disabled={this.state.fbCurrent.matches('execDisallowed')} onClick={() => fizzbuzzSubj.next() } variant="primary">Activate the Buzz</Button>
                                <Form.Control className={cx(sundaymorningStyles['no-resize'])} readOnly value={this.state.fbDisplay} as="textarea" rows={3} />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}


class FizzBuzz {
    constructor() {
        this.fbResult = "";
    }

    generateFB(limit=15) {
        if(limit > 9999) limit = 9999;
        if(limit <= 0) limit = 1;

        this.fbResult = "";
        for(let i = 1; i <= limit; i++) {
            if(i % 3 === 0 && i % 5 === 0) this.fbResult += `${i} FizzBuzz\n`;
            else if(i % 3 === 0) this.fbResult += `${i} Fizz\n`;
            else if(i % 5 === 0) this.fbResult += `${i} Buzz\n`;
        }

        return this.fbResult;
    }
}
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ShowCodeButton from '../ShowCodeButton';
import ShowCodePanel from '../ShowCodePanel';
import fizzbuzzStyles from './FizzBuzz.module.css';
import cx from 'classnames';
import { interpret } from 'xstate';
import { Subject } from 'rxjs';
import { fizzbuzzMachine } from './fizzbuzzMachine';

class FizzBuzzLogic {
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

const fizzbuzzLogic = new FizzBuzzLogic();
const fizzbuzzSubj = new Subject();

export default class FizzBuzz extends Component {
    constructor() {
        super();

        this.fizzbuzzService = interpret(fizzbuzzMachine).onTransition(fbCurrent =>
            this.setState({ fbCurrent })
        );

        this.state = {
            fbInput: "15",
            fbCurrent: fizzbuzzMachine.initialState,
            fbDisplayHeight: 0,
            fbDisplayWidth: 0,
            fbShowCodeActive: false
        }

        this.fbRef = React.createRef();
    }
    componentDidMount() {
        this.fizzbuzzService.start();
        
        this.setState({
            fbDisplayHeight: this.fbRef.current.clientHeight,
            fbDisplayWidth: this.fbRef.current.clientWidth
        }, () => {
            console.log(this.state.fbDisplayHeight);
        })

        fizzbuzzSubj.subscribe({
            next: () => {
                let inputVal;
                this.state.fbInput.length === 0 ? inputVal = "15" : inputVal = this.state.fbInput;
                this.setState({fbDisplay: fizzbuzzLogic.generateFB(parseInt(inputVal))});
            }
        });
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

    handleShowCodeButtonClick = (e) => {
        console.log('clicked');
        this.setState(prevState => ({
            fbShowCodeActive: !prevState.fbShowCodeActive
        }));
    }

    render() {
        return (
            <Row>
                <Col className={cx(fizzbuzzStyles['paddingor'])}>
                    <Card ref={this.fbRef} className={cx(fizzbuzzStyles['fizzbuzzCard'], fizzbuzzStyles['topRightor'])}>
                        <Card.Title className={cx(fizzbuzzStyles['fizzbuzzTitle'])}>
                            <div>
                                Fizzbuzz
                            </div>
                            <ShowCodeButton onClick={this.handleShowCodeButtonClick} position='side' />
                        </Card.Title>
                        <Card.Subtitle>The classic Fizzbuzz</Card.Subtitle>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Enter Limit (min 1, max 9999)</Form.Label>
                                <Form.Control type="text" placeholder="15" onChange={this.handleFBInputChange}></Form.Control>
                                { this.state.fbCurrent.matches('execAllowed') && <Form.Text>Default 15</Form.Text> }
                                { this.state.fbCurrent.matches('execDisallowed') && <Form.Text className={cx(fizzbuzzStyles['input-error'])}>Input must be a number between 1 and 9999</Form.Text> }
                                <Button disabled={this.state.fbCurrent.matches('execDisallowed')} onClick={() => fizzbuzzSubj.next() } variant="primary">Activate the Buzz</Button>
                                <Form.Control className={cx(fizzbuzzStyles['no-resize'])} readOnly value={this.state.fbDisplay} as="textarea" rows={3} />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <ShowCodePanel className={cx(fizzbuzzStyles['paddingor'])}
                    showComp="FizzBuzz" 
                    panelHeight={ this.state.fbDisplayHeight }
                    panelWidth={ this.state.fbDisplayWidth }
                    showCodeActive={ this.state.fbShowCodeActive }
                />
            </Row>
        )
    }
}



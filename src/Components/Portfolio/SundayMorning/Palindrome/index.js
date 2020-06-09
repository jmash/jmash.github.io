import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import palindromeStyles from './Palindrome.module.css';
import cx from 'classnames';
import { interpret } from 'xstate';
import { palindromeMachine } from './palindromeMachine';
import { Subject } from 'rxjs';

class PalindromeChecker {
    checkPalindrome(input) {
        let inputStr = input.toString();
        inputStr = inputStr.toUpperCase().replace(/\s/g, "");
        let inputStrRev = inputStr.split('').reverse().join('');
        console.log(inputStr, inputStrRev);
        if(inputStr === inputStrRev) return true;
        else return false;
    }
}

const palindromeChecker = new PalindromeChecker();
const palindromeCheckerSubj = new Subject();

export default class Palindrome extends Component {
    constructor() {
        super();

        this.palindromeService = interpret(palindromeMachine).onTransition(palCurrent =>
            this.setState({ palCurrent })
        );

        this.state = {
            palInput: "",
            palDisplay: "",
            palCurrent: palindromeMachine.initialState,
        }
    }

    componentDidMount() {
        this.palindromeService.start();

        palindromeCheckerSubj.subscribe({
            next: () => {
                if(palindromeChecker.checkPalindrome(this.state.palInput))
                    this.setState({palDisplay: "It's palindromic!"});
                else 
                    this.setState({palDisplay: "It's not palindromic."})
            }
        });
    }

    componentWillUnmount() {
        this.palindromeService.stop();
    }
    
    handlePalInputChange = (e) => {
        this.setState({
            palInput: e.target.value
        }, () => {
            this.palindromeService.send({ type: 'CHANGE', input: this.state.palInput });
        });
    }

    render() {
        return (
            <Row>
                <Col>
                    <Card>
                        <Card.Title>Palindrome Checker</Card.Title>
                        <Card.Subtitle>Checks if a word or sentence is a palindrome!</Card.Subtitle>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Enter Word or Sentence to Check</Form.Label>
                                <Form.Control type="text" placeholder="Word/Sentence" onChange={this.handlePalInputChange}></Form.Control>
                                { this.state.palCurrent.matches('execAllowed') && <Form.Text>Only letters or numbers allowed (no special characters or punctuation)</Form.Text>}
                                { this.state.palCurrent.matches('execDisallowed') && <Form.Text className={cx(palindromeStyles['input-error'])}>Only letters or numbers allowed (no special characters or punctuation) &gt;_&lt;</Form.Text>}
                                <Button disabled={this.state.palCurrent.matches('execDisallowed')} onClick={() => palindromeCheckerSubj.next() }>Check for Palindromicity</Button>
                                <Form.Control className={cx(palindromeStyles['no-resize'])} readOnly value={this.state.palDisplay} as="textarea" rows={1} />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}
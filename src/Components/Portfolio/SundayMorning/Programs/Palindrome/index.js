import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import palindromeStyles from './Palindrome.module.css';
import cx from 'classnames';
import { interpret } from 'xstate';
import { palindromeMachine } from './palindromeMachine';
import { Subject } from 'rxjs';

class PalindromeLogic {
    checkPalindrome(input) {
        let inputStr = input.toString();
        inputStr = inputStr.toUpperCase().replace(/\s/g, "");
        let inputStrRev = inputStr.split('').reverse().join('');
        if(inputStr === inputStrRev) return true;
        else return false;
    }
}

const palindromeLogic = new PalindromeLogic();
const palindromeSubj = new Subject();

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
            palDisplayHeight: 0,
            palDisplayWidth: 0,
        }
    }

    componentDidMount() {
        this.palindromeService.start();

        palindromeSubj.subscribe({
            next: () => {
                if(palindromeLogic.checkPalindrome(this.state.palInput))
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

    handleShowCodeButtonClick = () => {
        this.setState(prevState => ({
            palShowCodeActive: !prevState.palShowCodeActive
        }));
    }

    render() {
        return (
            <Card.Body>
                <Form.Group>
                    <Form.Label>Enter Word or Sentence to Check</Form.Label>
                    <Form.Control type="text" placeholder="Word/Sentence" onChange={this.handlePalInputChange}></Form.Control>
                    { this.state.palCurrent.matches('execAllowed') && <Form.Text>Only letters or numbers allowed (no special characters or punctuation)</Form.Text>}
                    { this.state.palCurrent.matches('execDisallowed') && <Form.Text className={cx(palindromeStyles['input-error'])}>Only letters or numbers allowed (no special characters or punctuation) &gt;_&lt;</Form.Text>}
                    <Button className="my-1" disabled={this.state.palCurrent.matches('execDisallowed')} onClick={() => palindromeSubj.next() }>Check for Palindromicity</Button>
                    <Form.Control className={cx(palindromeStyles['no-resize'])} readOnly value={this.state.palDisplay} as="textarea" rows={1} />
                </Form.Group>
            </Card.Body>
        );
    }
}
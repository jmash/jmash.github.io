import React, { Component } from 'react';
import FizzBuzz from './fizzbuzz.js';
import PalindromeChecker from './palindrome.js';
import RandomQuote from './randomQuote.js';
// import LetterAnalyzer from './letterAnalyzer.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import sundaymorningStyles from './SundayMorning.module.css';
import cx from 'classnames';
import { interpret } from 'xstate';
import { fizzbuzzMachine } from './fizzbuzzMachine';
import { palindromeMachine } from './palindromeMachine';
import { randomQuoteMachine } from './randomQuoteMachine';
import { letterAnalyzerMachine } from './letterAnalyzerMachine';
import { Subject } from 'rxjs';

const fizzbuzz = new FizzBuzz();
const fizzbuzzSubj = new Subject();
const palindromeChecker = new PalindromeChecker();
const palindromeCheckerSubj = new Subject();
const randomQuote = new RandomQuote();
const randomQuoteSubj = new Subject();
// const letterAnalyzer = new LetterAnalyzer();
const letterAnalyzerSubj = new Subject();


class SundayMorning extends Component {
    constructor() {
        super();

        this.fizzbuzzService = interpret(fizzbuzzMachine).onTransition(fbCurrent =>
            this.setState({ fbCurrent })
        );

        this.palindromeService = interpret(palindromeMachine).onTransition(palCurrent =>
            this.setState({ palCurrent })
        );

        this.randomQuoteService = interpret(randomQuoteMachine).onTransition(rqCurrent =>
            this.setState({ rqCurrent })
        );

        this.letterAnalyzerService = interpret(letterAnalyzerMachine).onTransition(laCurrent =>
            this.setState({ laCurrent })
        );

        this.canvasRef = React.createRef();

        this.state = {
            fbInput: "15",
            palInput: "",
            fbDisplay: "",
            palDisplay: "",
            rqDisplayQuote: "",
            rqDisplayAuthor: "",
            rqDisplayFull: "",
            laCharMax: 10000,
            laCharCount: 0,
            laInput: "",
            fbCurrent: fizzbuzzMachine.initialState,
            palCurrent: palindromeMachine.initialState,
            rqCurrent: randomQuoteMachine.initialState,
            laCurrent: letterAnalyzerMachine.initialState
        }
    }

    componentDidMount() {
        this.fizzbuzzService.start();
        this.palindromeService.start();
        this.randomQuoteService.start();
        this.letterAnalyzerService.start();

        fizzbuzzSubj.subscribe({
            next: () => {
                let inputVal;
                this.state.fbInput.length === 0 ? inputVal = "15" : inputVal = this.state.fbInput;
                this.setState({fbDisplay: fizzbuzz.generateFB(parseInt(inputVal))});
            }
        });
        palindromeCheckerSubj.subscribe({
            next: () => {
                if(palindromeChecker.checkPalindrome(this.state.palInput))
                    this.setState({palDisplay: "It's palindromic!"});
                else 
                    this.setState({palDisplay: "It's not palindromic."})
            }
        });
        randomQuoteSubj.subscribe({
            next: () => {
                this.handleRQActivate();
            }
        });
        letterAnalyzerSubj.subscribe({
            next: () => {
                
            }
        });
    }

    componentWillUnmount() {
        this.fizzbuzzService.stop();
        this.palindromeService.stop();
        this.randomQuoteService.stop();
        this.letterAnalyzerService.stop();
    }

    handleFBInputChange = (e) => {
        this.setState({
            fbInput: e.target.value
        }, () => {
            this.fizzbuzzService.send({ type: 'CHANGE', input: this.state.fbInput });
            console.log(this.fizzbuzzService._state);
        });
    }

    handlePalInputChange = (e) => {
        this.setState({
            palInput: e.target.value
        }, () => {
            this.palindromeService.send({ type: 'CHANGE', input: this.state.palInput });
        });
    }

    handleRQActivate = (e) => {
        if(this.state.rqCurrent.matches('idle')) {
            this.randomQuoteService.send({ type: 'ACTIVATE' });
        }
        let randomQuoteRes = randomQuote.getRandomQuote();
        randomQuoteRes.then((res) => {
            this.randomQuoteService.send({ type: 'RESPONSE', status: res.status });
            
            return res.json();
        }).then(resj => {
            this.setState({
                rqDisplayQuote: resj.content,
                rqDisplayAuthor: resj.author,
                rqDisplayFull: resj.content + "\n\n- " + resj.author
            })
        });
    }

    handleLAInputChange = (e) => {
        this.setState({
            laCharCount: e.target.value.length,
            laInput: e.target.value
        }, () => {
            this.letterAnalyzerService.send({ type: 'CHANGE', length: this.state.laCharCount });
            console.log(this.state.laCharCount);
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
                                    { this.state.palCurrent.matches('execDisallowed') && <Form.Text className={cx(sundaymorningStyles['input-error'])}>Only letters or numbers allowed (no special characters or punctuation) &gt;_&lt;</Form.Text>}
                                    <Button disabled={this.state.palCurrent.matches('execDisallowed')} onClick={() => palindromeCheckerSubj.next() }>Check for Palindromicity</Button>
                                    <Form.Control className={cx(sundaymorningStyles['no-resize'])} readOnly value={this.state.palDisplay} as="textarea" rows={1} />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Title>Random Quote Machine</Card.Title>
                            <Card.Subtitle>Press the button, get a random quote!</Card.Subtitle>
                            <Card.Body>
                                <Form.Group>
                                    <Button disabled={this.state.rqCurrent.matches('loading')} onClick={() => randomQuoteSubj.next()}>{this.state.rqCurrent.matches('loading') ? 'Loading' : 'Click for Quote'}</Button>
                                    <Form.Control className={cx(sundaymorningStyles['no-resize'])} readOnly value={this.state.rqDisplayFull} as="textarea" rows={3} />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Title>Letter Analyzer</Card.Title>
                            <Card.Subtitle>Enter some text and get a breakdown of how many of each letter was used</Card.Subtitle>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Control className={cx(sundaymorningStyles['no-resize'])} as="textarea" rows={5} onChange={this.handleLAInputChange} />
                                        <Form.Text>Limit of 10000 characters - {this.state.laCharCount}/{this.state.laCharMax} characters left</Form.Text>
                                    <Button 
                                        disabled={this.state.laCurrent.matches('error') ||
                                                  this.state.laCurrent.matches('start') } 
                                        onClick={() => letterAnalyzerSubj.next() }>
                                            Generate Letter Analysis
                                    </Button>
                                </Form.Group>
                                <canvas ref={this.canvasRef} id="letterAnalyzerChart" width="400" height="0"/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SundayMorning;
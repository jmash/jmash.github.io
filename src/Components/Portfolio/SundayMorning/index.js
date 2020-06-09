import React, { Component } from 'react';
import FizzBuzz from './FizzBuzz';
import Palindrome from './Palindrome';
import RandomQuote from './RandomQuote';
import LetterAnalyzer from './letterAnalyzer.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import sundaymorningStyles from './SundayMorning.module.css';
import cx from 'classnames';
import { interpret } from 'xstate';
import { letterAnalyzerMachine } from './letterAnalyzerMachine';
import { Subject } from 'rxjs';



const letterAnalyzerSubj = new Subject();


class SundayMorning extends Component {
    constructor() {
        super();

        this.letterAnalyzerService = interpret(letterAnalyzerMachine).onTransition(laCurrent =>
            this.setState({ laCurrent })
        );

        this.canvasRef = React.createRef();

        this.state = {
            
            laCharMax: 10000,
            laCharCount: 0,
            laUpdateCount: 0,
            laInput: "",
            
            laCurrent: letterAnalyzerMachine.initialState
        }
    }

    componentDidMount() { 
        let letterAnalyzerGraph = LetterAnalyzer.createGraph(this.canvasRef.current, [], []);

        letterAnalyzerSubj.subscribe({
            next: () => {
                let letterBreakdown = {};
                let characters = this.state.laInput.split('');
                characters = characters.map(c => c.toLowerCase());
                characters = characters.sort();
                
                for(let char in characters) {
                    if(letterBreakdown[characters[char]]) {
                        if(characters[char].toUpperCase() !== characters[char].toLowerCase())
                            letterBreakdown[characters[char]]++;
                    } else {
                        if(characters[char].toUpperCase() !== characters[char].toLowerCase())
                            letterBreakdown[characters[char]] = 1;
                    }
                }
                let xs = [];
                let ys = [];
                for(let l in letterBreakdown) {
                    xs.push(l);
                    ys.push(letterBreakdown[l]);
                }

                console.log(xs);
                console.log(ys);

                LetterAnalyzer.dumpGraph(letterAnalyzerGraph);
                LetterAnalyzer.updateGraph(xs, ys, letterAnalyzerGraph);                
            }
        });
    }

    componentWillUnmount() {
        
        this.letterAnalyzerService.stop();
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
                <FizzBuzz />
                <Palindrome />
                <RandomQuote />
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
                                <canvas ref={this.canvasRef} id="letterAnalyzerChart" width="400" height="400"/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SundayMorning;
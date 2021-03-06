import React, { Component } from 'react';
import FizzBuzz from './FizzBuzz';
import Palindrome from './Palindrome';
import RandomQuote from './RandomQuote';
import LetterAnalyzer from './LetterAnalyzer';
import TicTacToe from './TicTacToe';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SundayMorning extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Sunday Morning Programming Projects</h1>
                        <h2>Easy like a smooth cup o' joe on a breezy Sunday morning <span role="img" aria-label="coffee">☕</span></h2>
                    </Col>
                </Row>
                <FizzBuzz />
                <Palindrome />
                <RandomQuote />
                <LetterAnalyzer />
                <TicTacToe />
            </Container>
        );
    }
}

export default SundayMorning;
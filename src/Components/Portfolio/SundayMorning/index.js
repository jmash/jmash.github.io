import React, { Component } from 'react';
import ProgramCard from './ProgramCard';
import Container from 'react-bootstrap/Container';
import FizzBuzz from './FizzBuzz';
import Palindrome from './Palindrome';
import RandomQuote from './RandomQuote';
import LetterAnalyzer from './LetterAnalyzer';
import TicTacToe from './TicTacToe';
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
                <ProgramCard program={<FizzBuzz />} programTitle={'FizzBuzz'} programSubtitle={'The classic Fizzbuzz'} />
                <ProgramCard program={<Palindrome />} programTitle={'Palindrome Checker'} programSubtitle={'Checks if a word or sentence is a palindrome!'} />
                <ProgramCard program={<RandomQuote />} programTitle={'Random Quote Machine'} programSubtitle={'Press the button, get a random quote!'} />
                <ProgramCard program={<LetterAnalyzer />} programTitle={'Letter Analzyer'} programSubtitle={'Enter some text and get a breakdown of how many of each letter was used'} />
                <ProgramCard program={<TicTacToe />} programTitle={'TicTacToe'} programSubtitle={'The Classic Game of TicTacToe!'} />
            </Container>
        );
    }
}

export default SundayMorning;
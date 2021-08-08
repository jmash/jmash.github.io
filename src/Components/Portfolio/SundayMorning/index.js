import React, { Component } from 'react';
import ProgramCard from './ProgramCard';
import Container from 'react-bootstrap/Container';
import FizzBuzz from './Programs/FizzBuzz';
import Palindrome from './Programs/Palindrome';
import RandomQuote from './Programs/RandomQuote';
import LetterAnalyzer from './Programs/LetterAnalyzer';
import TicTacToe from './Programs/TicTacToe';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import gsap from 'gsap';

class SundayMorning extends Component {
    constructor() {
        super();

        const programCount = 5; // this is not a fantastic solution but it will do for now
        let initTimelineArray = [];
        let initRefArray = [];
        for(let i = 0; i < programCount; i++) {
            initRefArray.push(React.createRef());
        }

        for(let i = 0; i < programCount; i++) {
            initTimelineArray.push(gsap.timeline());
        }

        this.state = {
            programCount: programCount,
            timelineArray: initTimelineArray,
            refArray: initRefArray
        }
    }
    
    componentDidMount() {
        for(let i = 0; i < this.state.programCount; i++) {
            let frontCard = this.state.refArray[i].current.pcRef.current;
            let backCard = this.state.refArray[i].current.scRef.current;
            this.state.timelineArray[i].restart();
            this.state.timelineArray[i].pause();
            this.state.timelineArray[i].set(backCard, {rotationY:-180});
            this.state.timelineArray[i].to(frontCard, 1, {rotationY:180})
            .to(backCard, 1, {rotationY:0}, 0)
            .set(frontCard, {visibility:'hidden'});
        }
    }

    flipCardToBack(refIndex) {
        this.state.timelineArray[refIndex].play();
    }

    flipCardToFront(refIndex) {
        this.state.timelineArray[refIndex].reverse();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Sunday Morning Programming Projects</h1>
                        <h2>Easy like a smooth cup o' joe on a breezy Sunday morning <span role="img" aria-label="coffee">☕</span></h2>
                    </Col>
                </Row>
                <Container>
                    <ProgramCard key={1} refIndex={0} ref={this.state.refArray[0]} 
                        clickFront={() => this.flipCardToBack(this.state.refArray[0].current.props.refIndex)} 
                        clickBack={() => this.flipCardToFront(this.state.refArray[0].current.props.refIndex)} 
                        program={<FizzBuzz />} 
                        programTitle={'FizzBuzz'} 
                        programSubtitle={'The classic Fizzbuzz'} />
                    <ProgramCard key={2} refIndex={1} ref={this.state.refArray[1]} 
                        clickFront={() => this.flipCardToBack(this.state.refArray[1].current.props.refIndex)} 
                        clickBack={() => this.flipCardToFront(this.state.refArray[1].current.props.refIndex)} 
                        program={<Palindrome />} 
                        programTitle={'Palindrome Checker'} 
                        programSubtitle={'Checks if a word or sentence is a palindrome!'} />
                    <ProgramCard key={3} refIndex={2} ref={this.state.refArray[2]} 
                        clickFront={() => this.flipCardToBack(this.state.refArray[2].current.props.refIndex)} 
                        clickBack={() => this.flipCardToFront(this.state.refArray[2].current.props.refIndex)} 
                        program={<RandomQuote />} 
                        programTitle={'Random Quote Machine'} 
                        programSubtitle={'Press the button, get a random quote!'} />
                    <ProgramCard key={4} refIndex={3} ref={this.state.refArray[3]} 
                        clickFront={() => this.flipCardToBack(this.state.refArray[3].current.props.refIndex)} 
                        clickBack={() => this.flipCardToFront(this.state.refArray[3].current.props.refIndex)} 
                        program={<LetterAnalyzer />} programTitle={'Letter Analzyer'} 
                        programSubtitle={'Enter some text and get a breakdown of how many of each letter was used'} />
                    <ProgramCard key={5} refIndex={4} ref={this.state.refArray[4]} 
                        clickFront={() => this.flipCardToBack(this.state.refArray[4].current.props.refIndex)} 
                        clickBack={() => this.flipCardToFront(this.state.refArray[4].current.props.refIndex)} 
                        program={<TicTacToe />} 
                        programTitle={'TicTacToe'} 
                        programSubtitle={'The Classic Game of TicTacToe!'} />
                </Container>
            </Container>
        );
    }
}

export default SundayMorning;
import React, { Component } from 'react';
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
                        <h2>Easy like a smooth cup o' joe on a breezy Sunday morning</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Fizzbuzz</h1>
                        <h2>The classic Fizzbuzz</h2>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SundayMorning;
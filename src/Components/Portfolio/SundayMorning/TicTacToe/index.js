import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import tictactoeStyles from './TicTacToe.module.css';
import cx from 'classnames';
import { interpret } from 'xstate';
import { tictactoeMachine } from './tictactoeMachine';
import { Subject } from 'rxjs';

export default class TicTacToe extends Component {
    constructor() {
        super();

    }

    render() {
        return(
            <Row>
                <Col>
                    <Card>
                        <Card.Title>TicTacToe</Card.Title>
                        <Card.Subtitle>The Classic Game of TicTacToe!</Card.Subtitle>
                        <Card.Body>
                            <Row>
                                <Col>1</Col>
                                <Col>2</Col>
                                <Col>3</Col>
                            </Row>
                            <Row>
                                <Col>4</Col>
                                <Col>5</Col>
                                <Col>6</Col>
                            </Row>
                            <Row>
                                <Col>7</Col>
                                <Col>8</Col>
                                <Col>9</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}
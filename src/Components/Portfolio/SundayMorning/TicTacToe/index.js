import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Cell from './Cell';
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
                        <Card.Body className={cx(tictactoeStyles['tttBoard'])}>
                            <Row>
                                <Col><Cell props={"ey"}/></Col>
                                <Col><Cell /></Col>
                                <Col><Cell /></Col>
                            </Row>
                            <Row>
                                <Col><Cell /></Col>
                                <Col><Cell /></Col>
                                <Col><Cell /></Col>
                            </Row>
                            <Row>
                                <Col><Cell /></Col>
                                <Col><Cell /></Col>
                                <Col><Cell /></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}
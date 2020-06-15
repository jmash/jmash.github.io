import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Cell from './Cell';
import tictactoeStyles from './TicTacToe.module.css';
import cx from 'classnames';
import { interpret } from 'xstate';
import { tictactoeMachine } from './tictactoeMachine';
// import { Subject } from 'rxjs';

export default class TicTacToe extends Component {
    constructor() {
        super();
        this.tictactoeService = interpret(tictactoeMachine).onTransition(tttCurrent =>
            this.setState({ tttCurrent })
        );

        this.state = {
            tttDisplay: [['', '', ''], ['', '', ''], ['', '', '']],
            tttCurrent: tictactoeMachine.initialState
        }

    }

    componentDidMount() {
        this.tictactoeService.start();
    }

    componentWillUnmount() {
        this.tictactoeService.stop();
    }

    resetDisplay = () => {
        let resetDisplay = [['', '', ''], ['', '', ''], ['', '', '']];
        this.setState({
            tttDisplay: resetDisplay
        });
    }

    handleStartClick = (event) => {
        if(this.state.tttCurrent.matches('reset')) {
            this.tictactoeService.send({type: 'START_GAME'})
        } else {
            this.tictactoeService.send({type: 'RESET'})
            this.resetDisplay();
        }
    }

    handleCellClick = (event) => {
        let cellPos = event.currentTarget.dataset.pos;
        let [x, y] = [cellPos[0], cellPos[2]];
        let uptttDisplay = [...this.state.tttDisplay];
        if(this.state.tttDisplay[x][y] === '') {
            if(this.state.tttCurrent.matches('playerOneTurn')) {
                uptttDisplay[x][y] = 'X';  
            } else if(this.state.tttCurrent.matches('playerTwoTurn')) {
                uptttDisplay[x][y] = 'O';
            }
        
            this.setState({
                tttDisplay: uptttDisplay,
            }, () => {
                this.tictactoeService.send({type: 'TURN_TAKEN', display: this.state.tttDisplay});
            });
        }  
    }

    render() {
        let startButtonText;
        if(!this.state.tttCurrent.matches('reset')) {
            startButtonText = "Reset";
        } else {
            startButtonText = "Start";
        }

        let gameStatusText;
        if(this.state.tttCurrent.matches('reset')) {
            gameStatusText = "Press Start to Begin the Game";
        } else if(this.state.tttCurrent.matches('playerOneVictory')) {
            gameStatusText = "Player One Wins the Game!!";
        } else if (this.state.tttCurrent.matches('playerTwoVictory')) {
            gameStatusText = "Player Two Wins the Game!!";
        } else if (this.state.tttCurrent.matches('gameDraw')) {
            gameStatusText = "Game Ends in a Draw!!";
        } else {
            gameStatusText = "Game in Progress";
        }

        return(
            <Row>
                <Col>
                    <Card>
                        <Card.Title>TicTacToe</Card.Title>
                        <Card.Subtitle>The Classic Game of TicTacToe!</Card.Subtitle>
                        <Card.Header>{gameStatusText}</Card.Header>
                        <Card.Body className={cx(tictactoeStyles['tttBoard'])}>
                            <Row>
                                <Col className={cx(tictactoeStyles['tttCol'])}>
                                    <Cell
                                        onClick={this.handleCellClick}
                                        dataPos="0_0"
                                        gridPos="topLeft"
                                        cellDisplay={this.state.tttDisplay[0][0]} />
                                </Col>
                                <Col className={cx(tictactoeStyles['tttCol'])}><Cell
                                        onClick={this.handleCellClick}
                                        dataPos="0_1"
                                        gridPos="top"
                                        cellDisplay={this.state.tttDisplay[0][1]}/>
                                </Col>
                                <Col className={cx(tictactoeStyles['tttCol'])}><Cell
                                        onClick={this.handleCellClick}
                                        dataPos="0_2"
                                        gridPos="topRight"
                                        cellDisplay={this.state.tttDisplay[0][2]}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={cx(tictactoeStyles['tttCol'])}><Cell
                                        onClick={this.handleCellClick}
                                        dataPos="1_0"
                                        gridPos="left"
                                        cellDisplay={this.state.tttDisplay[1][0]}/>
                                </Col>
                                <Col className={cx(tictactoeStyles['tttCol'])}><Cell
                                        onClick={this.handleCellClick}
                                        dataPos="1_1"
                                        gridPos=""
                                        cellDisplay={this.state.tttDisplay[1][1]}/>
                                </Col>
                                <Col className={cx(tictactoeStyles['tttCol'])}><Cell
                                        onClick={this.handleCellClick}
                                        dataPos="1_2"
                                        gridPos="right"
                                        cellDisplay={this.state.tttDisplay[1][2]}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={cx(tictactoeStyles['tttCol'])}><Cell
                                        onClick={this.handleCellClick}
                                        dataPos="2_0"
                                        gridPos="bottomLeft"
                                        cellDisplay={this.state.tttDisplay[2][0]}/>
                                </Col>
                                <Col className={cx(tictactoeStyles['tttCol'])}><Cell
                                        onClick={this.handleCellClick}
                                        dataPos="2_1"
                                        gridPos="bottom"
                                        cellDisplay={this.state.tttDisplay[2][1]}/>
                                </Col>
                                <Col className={cx(tictactoeStyles['tttCol'])}><Cell
                                        onClick={this.handleCellClick}
                                        dataPos="2_2" 
                                        gridPos="bottomRight"
                                        cellDisplay={this.state.tttDisplay[2][2]}/>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col className={cx(tictactoeStyles['footerColCenter'])}>
                                    {this.state.tttCurrent.matches('playerOneTurn') && <span className={cx(tictactoeStyles['turnActive'])}>
                                        Player One
                                    </span>
                                    }
                                    {!this.state.tttCurrent.matches('playerOneTurn') && <span>
                                        Player One
                                    </span>
                                    }
                                </Col>
                                <Col className={cx(tictactoeStyles['footerColCenter'])}>
                                    <Button onClick={this.handleStartClick}>{startButtonText}</Button>
                                </Col>
                                <Col className={cx(tictactoeStyles['footerColCenter'])}>
                                    {this.state.tttCurrent.matches('playerTwoTurn') && <span className={cx(tictactoeStyles['turnActive'])}>
                                        Player Two
                                    </span>
                                    }
                                    {!this.state.tttCurrent.matches('playerTwoTurn') && <span>
                                        Player Two
                                    </span>
                                    }
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        )
    }
}
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Cell from './Cell';
import tictactoeStyles from './TicTacToe.module.css';
import cx from 'classnames';
import gsap from 'gsap';
import { interpret } from 'xstate';
import { tictactoeMachine } from './tictactoeMachine';

export default class TicTacToe extends Component {
    constructor() {
        super();
        this.tictactoeService = interpret(tictactoeMachine).onTransition(tttCurrent =>
            this.setState({ tttCurrent })
        );

        this.state = {
            tttDisplay: [['', '', ''], ['', '', ''], ['', '', '']],
            tttCurrent: tictactoeMachine.initialState,
            tttShowCodeActive: false,
        }

        this.tttRef = React.createRef();
        this.testRef = React.createRef();
        this.cellRefs = [];
    }

    componentDidMount() {
        this.tictactoeService.start();
    }

    componentWillUnmount() {
        this.tictactoeService.stop();
    }

    resetDisplay = () => {
        this.tictactoeService.send({type: 'ANIM_FINISH'});
        gsap.set(this.cellRefs, {scale: 1});
        let resetDisplay = [['', '', ''], ['', '', ''], ['', '', '']];
        this.setState({
            tttDisplay: resetDisplay
        });
    }

    resetAnim = () => {
        gsap.to(this.cellRefs, 
            { duration: 0.3, 
              scale: 0, 
              stagger: {
                  each: 0.1,
                  from: 'start',
                  grid: 'auto',
                  ease: 'power2.bounce'
              }, 
              onComplete: this.resetDisplay 
            });
    }

    handleStartClick = () => {
        if(this.state.tttCurrent.matches('reset')) {
            this.tictactoeService.send({type: 'START_GAME'})
        } else {
            this.tictactoeService.send({type: 'RESET'})
            this.resetAnim();
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

    handleShowCodeButtonClick = (e) => {
        this.setState(prevState => ({
            tttShowCodeActive: !prevState.tttShowCodeActive
        }));
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
            <>
                <Card.Header>{gameStatusText}</Card.Header>
                <Card.Body>
                    <Row className={'justify-content-center'}>
                        {/* <Col> */}
                            <Cell
                                ref={(ref) => { this.cellRefs[0] = ref }} 
                                onClick={this.handleCellClick}
                                dataPos="0_0"
                                gridPos="topLeft"
                                cellDisplay={this.state.tttDisplay[0][0]} />
                        {/* </Col> */}
                        {/* <Col> */}
                            <Cell
                                ref={(ref) => { this.cellRefs[1] = ref }} 
                                onClick={this.handleCellClick}
                                dataPos="0_1"
                                gridPos="top"
                                cellDisplay={this.state.tttDisplay[0][1]}/>
                        {/* </Col> */}
                        {/* <Col> */}
                            <Cell
                                ref={(ref) => { this.cellRefs[2] = ref }}
                                onClick={this.handleCellClick}
                                dataPos="0_2"
                                gridPos="topRight"
                                cellDisplay={this.state.tttDisplay[0][2]}/>
                        {/* </Col> */}
                    </Row>
                    <Row className={'justify-content-center'} >
                            <Cell
                                ref={(ref) => { this.cellRefs[3] = ref }}
                                onClick={this.handleCellClick}
                                dataPos="1_0"
                                gridPos="left"
                                cellDisplay={this.state.tttDisplay[1][0]}/>
                            <Cell
                                ref={(ref) => { this.cellRefs[4] = ref }}
                                onClick={this.handleCellClick}
                                dataPos="1_1"
                                gridPos=""
                                cellDisplay={this.state.tttDisplay[1][1]}/>
                            <Cell
                                ref={(ref) => { this.cellRefs[5] = ref }}
                                onClick={this.handleCellClick}
                                dataPos="1_2"
                                gridPos="right"
                                cellDisplay={this.state.tttDisplay[1][2]}/>
                    </Row>
                    <Row className={'justify-content-center'}>
                            <Cell
                                ref={(ref) => { this.cellRefs[6] = ref }}
                                onClick={this.handleCellClick}
                                dataPos="2_0"
                                gridPos="bottomLeft"
                                cellDisplay={this.state.tttDisplay[2][0]}/>
                            <Cell
                                ref={(ref) => { this.cellRefs[7] = ref }}                                       
                                onClick={this.handleCellClick}
                                dataPos="2_1"
                                gridPos="bottom"
                                cellDisplay={this.state.tttDisplay[2][1]}/>
                            <Cell
                                ref={(ref) => { this.cellRefs[8] = ref }}
                                onClick={this.handleCellClick}
                                dataPos="2_2" 
                                gridPos="bottomRight"
                                cellDisplay={this.state.tttDisplay[2][2]}/>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Row className={'justify-content-center'}>
                        <Col className={'text-center'}>
                            {this.state.tttCurrent.matches('playerOneTurn') && <span className={cx(tictactoeStyles['turnActive'])}>
                                Player One
                            </span>
                            }
                            {!this.state.tttCurrent.matches('playerOneTurn') && <span>
                                Player One
                            </span>
                            }
                        </Col>
                        <Col className={'text-center'}>
                            <Button onClick={this.handleStartClick}>{startButtonText}</Button>
                        </Col>
                        <Col className={'text-center'}>
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
            </>
        )
    }
}
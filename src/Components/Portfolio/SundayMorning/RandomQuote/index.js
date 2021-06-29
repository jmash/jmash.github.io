import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ShowCodePanel from '../ShowCodePanel';
import ShowCodeButton from '../ShowCodeButton';
import randomquoteStyles from './RandomQuote.module.css';
import cx from 'classnames';
import { interpret } from 'xstate';
import { randomQuoteMachine } from './randomQuoteMachine';
import { Subject } from 'rxjs';

class RandomQuoteLogic {
    getRandomQuote = () => {
        return fetch('https://api.quotable.io/random', { method: 'GET' });
    }
}

const randomQuote = new RandomQuoteLogic();
const randomQuoteSubj = new Subject();

export default class RandomQuote extends Component {
    constructor() {
        this.randomQuoteService = interpret(randomQuoteMachine).onTransition(rqCurrent =>
            this.setState({ rqCurrent })
        );

        this.rqRef = React.createRef();

        this.state = {
            rqDisplayQuote: "",
            rqDisplayAuthor: "",
            rqDisplayFull: "",
            rqCurrent: randomQuoteMachine.initialState,
            rqDisplayHeight: 0,
            rqDisplayWidth: 0,
            rqShowCodeActive: false
        }
    }

    componentDidMount() {
        this.randomQuoteService.start();

        this.setState({
            rqDisplayHeight: this.rqRef.current.clientHeight,
            rqDisplayWidth: this.rqRef.current.clientWidth
        });

        randomQuoteSubj.subscribe({
            next: () => {
                this.handleRQActivate();
            }
        });
    }

    componentWillUnmount() {
        this.randomQuoteService.stop();
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
    
    handleShowCodeButtonClick = (e) => {
        this.setState(prevState => ({
            rqShowCodeActive: !prevState.rqShowCodeActive
        }));
    }

    render() {
        return(
            <Row className={cx(randomquoteStyles['rowSpacing'])}>
                <Col className={cx(randomquoteStyles['paddingor'])}>
                    <Card ref={this.rqRef} className={cx(randomquoteStyles['topRightor'])}>
                        <Card.Title>
                            <div>
                                Random Quote Machine
                            </div>
                            <ShowCodeButton onClick={this.handleShowCodeButtonClick} position='side' active={this.state.rqShowCodeActive} />
                            </Card.Title>
                        <Card.Subtitle>Press the button, get a random quote!</Card.Subtitle>
                        <Card.Body>
                            <Form.Group>
                                <Button disabled={this.state.rqCurrent.matches('loading')} onClick={() => randomQuoteSubj.next()}>{this.state.rqCurrent.matches('loading') ? 'Loading' : 'Click for Quote'}</Button>
                                <Form.Control className={cx(randomquoteStyles['no-resize'])} readOnly value={this.state.rqDisplayFull} as="textarea" rows={3} />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <ShowCodePanel className={cx(randomquoteStyles['paddingor'])}
                    showComp="RandomQuote" 
                    panelHeight={ this.state.rqDisplayHeight }
                    panelWidth={ this.state.rqDisplayWidth }
                    active={ this.state.rqShowCodeActive }
                />
            </Row>
        );
    }
}
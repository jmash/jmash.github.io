import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ShowCodeCard from '../ShowCodeCard';
import Card from 'react-bootstrap/Card';
import ShowCodeButton from '../ShowCodeButton';
import cx from 'classnames';
import programCardStyles from './ProgramCard.module.css';

export default class ProgramCard extends Component {
    constructor() {
        super();

        this.pcRef = React.createRef();
        this.scRef = React.createRef();
        this.containerRef = React.createRef();
        this.preRef = React.createRef();

        this.state = {
            pcDisplayWidth: 0,
            pcDisplayHeight: 0,
        }
    }

    componentDidMount() {
        this.setState({
            pcDisplayHeight: this.pcRef.current.offsetHeight,
        });
    }

    render() {
        return (
            <Row style={{ transformStyle:'preserve-3d', perspective: 1100, minHeight: this.state.pcDisplayHeight }} ref={this.containerRef} className={cx(programCardStyles['containerCard'], 'justify-content-center mb-3 position-relative') }>
                <Card style={{minHeight: this.state.pcDisplayHeight, zIndex: 5}} ref={this.pcRef} className={'w-100 shadow-sm position-absolute'} >
                    <Card.Title className={'pl-2 pt-1'}>
                        <Container>
                            <Row>
                                <Col>
                                    {this.props.programTitle}
                                </Col>
                                <Col className='text-right'>
                                    <ShowCodeButton icon={'code'} onClick={ this.props.clickFront } />
                                </Col>
                            </Row>
                        </Container>
                    </Card.Title>
                    
                    <Card.Subtitle className={'pl-3'}>{this.props.programSubtitle}</Card.Subtitle>
                    {this.props.program}
                </Card>
                <ShowCodeCard refs={{'scRef': this.scRef, 'preRef': this.preRef}} programTitle={this.props.programTitle} onClick={this.props.clickBack} ref={ this.scRef } displayHeight={this.state.pcDisplayHeight} />
            </Row>
        );
    }
}
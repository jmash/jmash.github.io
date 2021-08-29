import React, { Component } from 'react';
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
            <Row style={{ transformStyle:'preserve-3d', perspective: 1100, minHeight: this.state.pcDisplayHeight }} className={cx(programCardStyles['containerCard'], 'justify-content-center mb-3 position-relative') }>
                <Card style={{minHeight: this.state.pcDisplayHeight, zIndex: 5}} ref={this.pcRef} className={'w-100 shadow-sm position-absolute'} >
                    <ShowCodeButton icon={'code'} onClick={ this.props.clickFront } />
                    <Card.Title className={'pl-2 pt-1'}>
                        {this.props.programTitle}
                    </Card.Title>
                    
                    <Card.Subtitle className={'pl-3'}>{this.props.programSubtitle}</Card.Subtitle>
                    {this.props.program}
                </Card>
                <ShowCodeCard onClick={this.props.clickBack} ref={ this.scRef } displayHeight={this.state.pcDisplayHeight} />
            </Row>
        );
    }
}
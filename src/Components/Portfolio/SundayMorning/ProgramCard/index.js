import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export default class ProgramCard extends Component {
    render() {
        return (
            <Card className={'w-75 my-3'} >
                <Card.Title className={'pl-2 pt-1'}>
                        {this.props.programTitle}
                </Card.Title>
                
                <Card.Subtitle className={'pl-3'}>{this.props.programSubtitle}</Card.Subtitle>
                {this.props.program}
                
            </Card>
            
        );
    }
}
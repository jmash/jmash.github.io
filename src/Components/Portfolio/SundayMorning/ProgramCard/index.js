import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export default class ProgramCard extends Component {
    render() {
        return (
            <Card className={'w-75'} >
                <Card.Title>
                    <div>
                        {this.props.programTitle}
                    </div>
                </Card.Title>
                
                <Card.Subtitle>{this.props.programSubtitle}</Card.Subtitle>
                {this.props.program}
                
            </Card>
            
        );
    }
}
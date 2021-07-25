import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ShowCodeButton from '../ShowCodeButton';
import palindromeStyles from './ProgramCard.module.css';
import cx from 'classnames';

export default class Palindrome extends Component {
    render() {
        return (
            <Card className={cx(palindromeStyles['topRightor'])}>
                <Card.Title className={cx(palindromeStyles['palindromeStyles'])}>
                <div>
                    Palindrome Checker
                </div>
                <ShowCodeButton onClick={this.handleShowCodeButtonClick} position='side' active={this.state.palShowCodeActive} />
                </Card.Title>
                
                <Card.Subtitle>Checks if a word or sentence is a palindrome!</Card.Subtitle>
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Enter Word or Sentence to Check</Form.Label>
                        <Form.Control type="text" placeholder="Word/Sentence" onChange={this.handlePalInputChange}></Form.Control>
                        { this.state.palCurrent.matches('execAllowed') && <Form.Text>Only letters or numbers allowed (no special characters or punctuation)</Form.Text>}
                        { this.state.palCurrent.matches('execDisallowed') && <Form.Text className={cx(palindromeStyles['input-error'])}>Only letters or numbers allowed (no special characters or punctuation) &gt;_&lt;</Form.Text>}
                        <Button disabled={this.state.palCurrent.matches('execDisallowed')} onClick={() => palindromeSubj.next() }>Check for Palindromicity</Button>
                        <Form.Control className={cx(palindromeStyles['no-resize'])} readOnly value={this.state.palDisplay} as="textarea" rows={1} />
                    </Form.Group>
                </Card.Body>
            </Card>
            
        );
    }
}
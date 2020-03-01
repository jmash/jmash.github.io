import React from 'react';
// import styles from './Contact.module.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const Contact = () => {
    return (
        <Jumbotron className="w-75 mx-auto">
            <Container>
                <span>I'm Jared!</span>
            </Container>
        </Jumbotron>
    );
};

export default Contact;
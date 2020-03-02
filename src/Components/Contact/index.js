import React from 'react';
// import styles from './Contact.module.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    return (
        <Jumbotron className="w-75 mx-auto">
            <Container>
                <h1 className="display-6">Jared M Ashcraft</h1>
                <hr />
                <FontAwesomeIcon icon={ faEnvelope } />
            </Container>
        </Jumbotron>
    );
};

export default Contact;
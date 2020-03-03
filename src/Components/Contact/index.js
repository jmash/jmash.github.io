import React from 'react';
import Obfuscate from 'react-obfuscate';
// import styles from './Contact.module.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    return (
        <Jumbotron className="w-75 mx-auto">
            <Container>
                <h1 className="display-6">Jared M Ashcraft</h1>
                <hr />
                <Row>
                    <FontAwesomeIcon className="fa-2x" icon={ faEnvelope } />
                    <Obfuscate style={{ display:"inline-block" }} email="jaredmashcraft@gmail.com" />
                </Row>
                <Row>
                    <FontAwesomeIcon className="fa-2x" icon= { faPhone } />
                    <Obfuscate style={{ display:"inline-block" }} tel="407-632-2207" />
                </Row>
            </Container>
        </Jumbotron>
    );
};

export default Contact;
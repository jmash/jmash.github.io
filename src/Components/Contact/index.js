import React from 'react';
import Obfuscate from 'react-obfuscate';
import cx from 'classnames';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    return (
        <Container className={'mx-sm-auto'}>
            <Jumbotron className={cx('justify-content-center', 'mx-auto','col-xs-12','mt-4')}>
                <Container>
                    <h1 className={cx('display-6')}>Jared M Ashcraft</h1>
                    <h3 className={cx('lead')}>Developer</h3>
                    <hr />
                    <Row>
                        <FontAwesomeIcon className={'ml-3 mr-2 fa-2x'} icon= { faEnvelope } />
                        <Obfuscate email="jaredmashcraft@gmail.com" />
                    </Row>
                    <Row>
                        <FontAwesomeIcon className={'ml-3 mr-2 fa-2x'} icon={ faPhone } />
                        <Obfuscate tel="407-632-2207" />
                    </Row>
                </Container>
            </Jumbotron>
        </Container>
    );
};

export default Contact;
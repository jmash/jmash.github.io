import React from 'react';
import Obfuscate from 'react-obfuscate';
import cx from 'classnames';
import bsStyles from '../../assets/global-styles/bootstrap.module.css';
import faStyles from '../../assets/global-styles/fontawesome.module.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    return (
        <Jumbotron className="mx-auto col-xs-12 mt-4">
            <Container>
                <h1 className="display-6">Jared M Ashcraft</h1>
                <h3 className="pb-2">Web Developer</h3>
                <hr />
                <Row>
                    <FontAwesomeIcon className={cx(faStyles['fa-2x'])} icon={ faEnvelope } />
                    <Obfuscate 
                        className={
                            cx(bsStyles['ml-2'], bsStyles['mt-1'], bsStyles['font-weight-bold'])
                        } 
                        style={{ display:"inline-block" }} 
                        email="jaredmashcraft@gmail.com" 
                    />
                </Row>
                <Row>
                    <FontAwesomeIcon className="fa-2x" icon= { faPhone } />
                    <Obfuscate className={
                            cx(bsStyles['ml-2'], bsStyles['mt-1'], bsStyles['font-weight-bold'])
                        } 
                        style={{ display:"inline-block" }}  
                        tel="407-632-2207" 
                    />
                </Row>
            </Container>
        </Jumbotron>
    );
};

export default Contact;
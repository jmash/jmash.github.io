import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const About = () => {
    return (
            <Container>
                <Row>
                    <Col>
                        <section>
                            <h1>About Jared M Ashcraft</h1> 
                            <hr />
                            <p>Jared resides in The City Beautiful, Orlando, FL. He has spent the better part of his life in the education field, where he has worked as both a teacher and a personal tutor.</p>
	                        <p>Jared is a self-taught developer who has learned coding primarily by creating his own projects and collaborating with other developers. To that point, Jared has participated in several hackathons, volunteered with Code for Orlando, and has regularly attended tech meetups in the Orlando area.</p>
	                        <p>Jared primarily codes in both Javascript and C (this website is built in React.js!), and is acquainted with Python and C#. Because of his background in education, he is able to take difficult concepts and condense them into simpler, more digestible forms.</p>
	                        <p>Jared is interested in furthering his education in tech by exploring back-end development, more systems-level coding languages, and database architecture.</p>
                        </section>
                    </Col>
                </Row>
            </Container>
    );
};

export default About;
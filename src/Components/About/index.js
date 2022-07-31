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
	                        <p>
                                <ul>
                                    <li>Javascript</li>
                                    <li>C</li>
                                    <li>Python</li>
                                </ul>
                            </p>
	                        <p>Jared is interested in furthering his education in tech by exploring back-end development, more systems-level coding languages, and database architecture.</p>
                        </section>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <section className="m-3">
                            <article>
                                <div className={"embed-responsive embed-responsive-16by9 text-center"}>
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/AGMuwz9hdYY" title="Jared and David Give Presentation on Museum Assistant" frameBorder="0"/>
                                </div>
                                <aside className="mx-4">
                                    <small>
                                        <p>
                                            If you’d like to see the code for the project, check it out at <a href="https://github.com/PockyBum522/sms_museum_assistant">https://github.com/PockyBum522/sms_museum_assistant</a>.
                                        </p>
                                        <p>
                                            To see all the other great projects that were created during this hackathon, go to <a href="https://blog.tadhack.com/2021/09/26/tadhack-global-2021-summary/">https://blog.tadhack.com/2021/09/26/tadhack-global-2021-summary/</a>.
                                        </p>
                                        <p>
                                            Big thanks to Alan Quayle for putting on this great event, and a special shout out to Professor Jerry Reed at Valencia College West, who spent some time out of his day helping us get set up and sound-boarding our ideas. 
                                        </p>
                                    </small>
                                </aside>
                            </article>
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <section className="m-3">
                            <article>
                                <div className={"embed-responsive embed-responsive-16by9 text-center"}>
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/v-VdYMiZEBs?start=5759&end=6275" title="Jared and David Give Presentation on Telepaper" frameBorder="0"/>
                                </div>
                                <aside className="mx-4">
                                    <small>
                                        <p>
                                            To see all the other great projects that were created during this hackathon, go to <a href="https://blog.tadhack.com/2021/12/12/avaya-engage-the-results/">https://blog.tadhack.com/2021/09/26/tadhack-global-2021-summary/</a>.
                                        </p>
                                    </small>
                                </aside>
                            </article>
                        </section>
                    </Col>
                </Row>
            </Container>
    );
};

export default About;
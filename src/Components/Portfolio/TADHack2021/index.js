import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TADHack2021 = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <section className="m-3">
                        <article>
                            <h1>
                                Particpation in TADHack 2021
                            </h1>
                            <hr />
                            <p>
                                In September of 2021, myself (Jared Ashcraft) and my teammate David Sikes participated in TADHack 2021. Jared currently works for a tutoring center and deals primarily with JavaScript and front-end development environments (though he’s also very interested in systems-level development).  David codes primarily in C# for a manufacturing company.
                            </p>
                            <p>
                                We created a proof-of-concept for an SMS service designed primarily for museums and art galleries. Many museums have QR codes or other types of media that can be scanned for more information. Often, these types of media require additional applications or some other kind of additional functionality that needs to be enabled on a user’s phone before the media can be utilized. Our idea was that it would be much more convenient if the user only had to rely on a service already available on their phone. Upon buying a ticket, the user would be prompted to provide their phone number (which is already done in most cases for online purchases) and, upon the user arriving at the venue and having the ticket scanned, an introductory SMS message would be sent to the user’s phone. The user could send a message back asking for additional information regarding works in the venue, directions to locations within the venue, or miscellaneous help. Upon the user exiting the venue, a request for a review could be sent to the phone, and the response could be analyzed for sentiment. For our demo, we used Telnyx to create the server that would handle sending and responding to the SMS messages and Symbl.ai for its sentiment analysis technology.
                            </p>
                            <p>
                            The development process for our hack was sadly troubled. We decided (at Jared’s insistence) to use Node.js to develop the back-end. David’s background is in C#, so he had to learn JavaScript essentially from scratch and rely on Jared’s professed experience sight-unseen. This led to complications when Jared began having difficulty with the asynchronous logic of JavaScript’s async/await functions and Promise object types. We also had some difficulty using Symbl.ai’s webhooks to properly check for a return on sentiment analysis jobs posted to their API (it is entirely possible that we simply weren’t waiting long enough for the status in the API to update). We ended up using an admittedly Cro-Magnon type technique that involved hammering the API with requests until the response sent back a status of “completed.” The issues we had to fix delayed any other features besides the user response to a review being analyzed for sentiment. We had planned to include other features, such as a user request for information, but we barely had time to get one feature working that we could present. (We almost had nothing to present at all!) We managed to get the review sentiment feature completed just minutes before heading out to give the presentation. In a very distressing turn of events, our account was banned just as presentations were beginning. Our method of brutalizing Symbl.ai’s API to check for a change in job status was deemed suspicious (fair enough). With little time to spare, David made a last-ditch, heroic effort to reclaim the fruits of our labor, and managed to get the account switched out just in time. Our presentation was an ultimate success, even if it was slightly pared down from the original intention. It was, at least, good enough to warrant the $100 prize.
                            </p>
                            <div className={"embed-responsive embed-responsive-16by9 text-center"}>
                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/AGMuwz9hdYY" title="Jared and David Give Presentation on Museum Assistant" frameBorder="0"/>
                            </div>
                            <aside className="mx-4">
                                <small>
                                    <p>
                                        If you’d like to see the code for the project, check it out at <a href="https://github.com/PockyBum522/sms_museum_assistant">https://github.com/PockyBum522/sms_museum_assistant</a>.
                                    </p>
                                    <p>
                                        To see all the other great projects that were created during the hackathon, go to <a href="https://blog.tadhack.com/2021/09/26/tadhack-global-2021-summary/">https://blog.tadhack.com/2021/09/26/tadhack-global-2021-summary/</a>.
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
        </Container>
        
    );
};

export default TADHack2021;
import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import showCodeButtonStyles from './ShowCodeButton.module.css';

const ShowCodeButton = (props) => {
    const arrowRef = useRef(null);
    const symbolRef = useRef(null);

    if(arrowRef) {
        if(props.active) {
            console.log("animateToActive");
            animateToActive(props, arrowRef.current, symbolRef.current);
        } else {
            animateFromActive(props, arrowRef.current, symbolRef.current);
        }
    }

    return (
        <div className={cx(showCodeButtonStyles[props.position])}>
            <Button onClick={props.onClick} className={cx(showCodeButtonStyles['orstyling'])}>
                <div ref={ symbolRef } style={{display: 'inline-block'}}>
                    <FontAwesomeIcon icon={faCode} color="green" />
                </div>
                <div ref={ arrowRef } style={{display: 'inline-block' }}>
                    <FontAwesomeIcon className={cx(showCodeButtonStyles['showcodearrow'])} icon={ faCaretRight } color="green" />
                </div>
            </Button>
        </div>
    );
};

function animateToActive(props, arrowRef, symbolRef) {
    const tlArrow = gsap.timeline();
    tlArrow.to(arrowRef, {duration: 0.3, x:-10, y: 15, rotate: 90, ease: 'circ.in'})
        .to(arrowRef, {duration: 0.3, x:-20, y: 0, rotate: 180, ease: 'circ.out'});
    gsap.to(symbolRef, {x: 10});
}

function animateFromActive(props, arrowRef, symbolRef) {
    gsap.to(arrowRef, {x:0, rotate: 0});
    gsap.to(symbolRef, {x: 0});
}

export default ShowCodeButton;
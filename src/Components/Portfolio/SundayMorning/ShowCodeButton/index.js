import React, { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import showCodeButtonStyles from './ShowCodeButton.module.css';

const ShowCodeButton = (props) => {
    let arrowRef = useRef(null);
    let symbolRef = useRef(null);

    const [arrowAnimation, setArrowAnimation] = useState(null);
    const [symbolAnimation, setSymbolAnimation] = useState(null);

    useEffect(() => {
        setArrowAnimation(
            gsap.to(arrowRef, {duration: 0.3, scaleX: -1}).pause()
        );
        setSymbolAnimation(
            gsap.timeline().to(symbolRef, {duration: 0.15, scale: 0.8}).to(symbolRef, {duration: 0.15, scale: 1}).pause()
        );
    }, []);

    return (
        <div className={cx(showCodeButtonStyles[props.position])}>
            <Button onClick={function() { 
                    !props.active ? arrowAnimation.play() : arrowAnimation.reverse();
                    symbolAnimation.restart().play();
                    props.onClick();
                }} 
                className={cx(showCodeButtonStyles['orstyling'])}>
                <div ref={el => {symbolRef = el;}} style={{display: 'inline-block'}}>
                    <FontAwesomeIcon icon={faCode} color="green" />
                </div>
                <div ref={el => {arrowRef = el;}} style={{display: 'inline-block' }}>
                    <FontAwesomeIcon className={cx(showCodeButtonStyles['showcodearrow'])} icon={ faCaretRight } color="green" />
                </div>
            </Button>
        </div>
    );
};

export default ShowCodeButton;
import React, { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import showCodeButtonStyles from './ShowCodeButton.module.css';

const ShowCodeButton = (props) => {
    let symbolRef = useRef(null);

    const [symbolAnimation, setSymbolAnimation] = useState(null);

    useEffect(() => {
        setSymbolAnimation(
            gsap.timeline().to(symbolRef, {duration: 0.15, scale: 0.8}).to(symbolRef, {duration: 0.15, scale: 1}).pause()
        );
    }, []);

    return (
        <div className={cx(showCodeButtonStyles['showCodeButton'])}>
            <Button onClick={function() { 
                    symbolAnimation.restart().play();
                    props.onClick();
                }} 
                className={'btn btn-light'}>
                <div className={'rounded px-1'} ref={el => {symbolRef = el;}}>
                    <FontAwesomeIcon icon={faCode} color="green" />
                </div>
            </Button>
        </div>
    );
};

export default ShowCodeButton;
import React, { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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

    let iconEl;
    switch(props.icon) {
        case('code'):
            iconEl = <FontAwesomeIcon icon={faCode} color="green" />;
            break;
        case('back'):
            iconEl = <FontAwesomeIcon icon={faArrowLeft} color="green" />;
            break;
        default:
            iconEl = <FontAwesomeIcon icon={faCode} color="green" />;
            break;

    }

    return (
        <div style={{right: 0}} className={'px-1 py-1'}>
            <Button onClick={function() { 
                    symbolAnimation.restart().play();
                    props.onClick();
                }} 
                style={{borderColor:'green'}} className={cx(showCodeButtonStyles['showCodeButton'], 'shadow-sm btn btn-light bg-transparent')}>
                <div className={'rounded px-1'} ref={el => {symbolRef = el;}}>
                    {iconEl}
                </div>
            </Button>
        </div>
    );
};

export default ShowCodeButton;
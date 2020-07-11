import React, { useRef, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import gsap from 'gsap';
import cx from 'classnames';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FizzBuzzRaw from '!!raw-loader!../FizzBuzz/index.js';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LetterAnalyzerRaw from '!!raw-loader!../LetterAnalyzer/index.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import PalindromeRaw from '!!raw-loader!../Palindrome/index.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import RandomQuoteRaw from '!!raw-loader!../RandomQuote/index.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import TicTacToeRaw from '!!raw-loader!../RandomQuote/index.js'
import showCodePanelStyles from './ShowCodePanel.module.css';

const ShowCodePanel = (props) => {
    let showRawComp;
    
    let displayRef = useRef(null);

    const [panelAnimation, setPanelAnimation] = useState(null);
    const [panelActive, setPanelActive] = useState(false);

    if(props.active !== panelActive) {
        setPanelActive((prevState) => !prevState);
        console.log(props.active);
        panelAnimation.play();        
    }

    
    useEffect(() => {
        if(panelActive) {
            setPanelAnimation(
                gsap.to(displayRef.current, {duration: 0.5, width: '100%'})
            )
        } else {
            setPanelAnimation(
                gsap.to(displayRef.current, {duration: 0.5, width: '0'})
            )
        }
    }, [panelActive]);

    switch(props.showComp) {
        case "FizzBuzz": showRawComp = FizzBuzzRaw; break;
        case "Palindrome": showRawComp = PalindromeRaw; break;
        case "LetterAnalyzer": showRawComp = LetterAnalyzerRaw; break;
        case "RandomQuote": showRawComp = RandomQuoteRaw; break;
        case "TicTacToe": showRawComp = TicTacToeRaw; break;
        default: showRawComp = FizzBuzzRaw; break;
    }

    return (
        <Col className={cx(showCodePanelStyles['paddingor'])}>
            <div ref={displayRef} style={{width: 0, height: props.panelHeight}} className={cx(showCodePanelStyles['panelDisplaySide'])}>
                <code>
                    <p className={cx(showCodePanelStyles['codeDisplay'])}>{ showRawComp }</p>
                </code>
            </div>
        </Col>
    );
};

export default ShowCodePanel;
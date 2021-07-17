import React, { useRef, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import gsap from 'gsap';
import Highlight from 'react-highlight.js';
import javascriptLang from 'highlight.js/lib/languages/javascript';
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
import TicTacToeRaw from '!!raw-loader!../TicTacToe/index.js'
import showCodePanelStyles from './ShowCodePanel.module.css';

const ShowCodePanel = (props) => {
    let showRawComp;

    let displayRef = useRef(null);
    const preRef = useRef(null);

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
                gsap.timeline()
                    .to([displayRef.current, preRef.current], {duration: 0.25, width: '100%', opacity: 0.75 })
                    .to([displayRef.current, preRef.current], {duration: 0.25, height: '500px', opacity: 1})
            )
        } else {
            setPanelAnimation(
                gsap.to(displayRef.current, {duration: 0.5, width: '0', height: props.panelHeight, opacity: 0})
            )
        }
    }, [panelActive, props.panelHeight]);

    switch(props.showComp) {
        case "FizzBuzz": showRawComp = FizzBuzzRaw; break;
        case "Palindrome": showRawComp = PalindromeRaw; break;
        case "LetterAnalyzer": showRawComp = LetterAnalyzerRaw; break;
        case "RandomQuote": showRawComp = RandomQuoteRaw; break;
        case "TicTacToe": showRawComp = TicTacToeRaw; break;
        default: showRawComp = FizzBuzzRaw; break;
    }
    
    return (
        <Col ref={displayRef} style={{width: 0, height: props.panelHeight, margin: 0}}>
            <Highlight ref={preRef} language={javascriptLang}>
                { showRawComp }
            </Highlight>
        </Col>

    );
};

export default ShowCodePanel;

/*
<Col className={cx(showCodePanelStyles['paddingor'])}>
    <div ref={displayRef} style={{width: 0, height: props.panelHeight, margin: 0}} className={cx(showCodePanelStyles['panelDisplaySide'], "javascript")}>
        <pre ref={preRef} style={{height: props.panelHeight, margin: 0}}>
            <code>
                <p className={cx(showCodePanelStyles['codeDisplay'])}>{ showRawComp }</p>
            </code>
        </pre>
    </div>
</Col>
*/